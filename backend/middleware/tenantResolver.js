const redis = require('../config/redisClient');
const configDB = require('../config/configDB');
const getDB = require('../config/db');

module.exports = async (req, res, next) => {
  const host = req.headers.host.split(':')[0];
  let tenant = await redis.get(host);

  if (!tenant) {
    const [rows] = await configDB.query('SELECT * FROM stores WHERE domain = ?', [host]);
    if (rows.length === 0) return res.status(404).send('Store not found');
    tenant = rows[0];
    await redis.set(host, JSON.stringify(tenant), { EX: 300 });
  } else {
    tenant = JSON.parse(tenant);
  }

  req.tenant = tenant;
  req.db = getDB(tenant.db_name);
  next();
};