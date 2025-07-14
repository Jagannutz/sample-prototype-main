const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await req.db.query('SELECT * FROM products');
  res.json(rows);
});

module.exports = router;