require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// ADD CORS SUPPORT
const cors = require('cors');
app.use(cors());

console.log('✅ Step 1: Starting app.js');

// REDIS
const { createClient } = require('redis');
const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }
});

console.log('🟡 Step 2: Connecting to Redis...');
redisClient.connect()
  .then(() => {
    console.log('✅ Redis connected');
  })
  .catch(err => {
    console.error('❌ Redis connection error:', err);
  });

// MYSQL
const mysql = require('mysql2/promise');
console.log('🟡 Step 3: Preparing MySQL config DB connection...');
const configDb = mysql.createPool({
  host: process.env.CONFIG_DB_HOST,
  user: process.env.CONFIG_DB_USER,
  password: process.env.CONFIG_DB_PASS,
  database: process.env.CONFIG_DB_NAME,
});

console.log('✅ Step 4: MySQL pool created');

// MIDDLEWARE & ROUTES
app.use(express.json());

// Route: Products
app.get('/products', async (req, res) => {
  const host = req.headers.host;
  const domain = host.split(':')[0];
  console.log(`📡 Incoming request from domain: ${domain}`);

  try {
    const [rows] = await configDb.query('SELECT * FROM stores WHERE domain = ?', [domain]);

    if (rows.length === 0) {
      console.log(`❌ No store found for domain: ${domain}`);
      return res.status(404).json({ error: 'Store not found' });
    }

    const tenantDbName = rows[0].db_name;
    const tenantDb = mysql.createPool({
      host: process.env.CONFIG_DB_HOST,
      user: process.env.CONFIG_DB_USER,
      password: process.env.CONFIG_DB_PASS,
      database: tenantDbName
    });

    const [products] = await tenantDb.query('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    console.error('❌ Error fetching products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Backend running on http://localhost:${port}`);
});
