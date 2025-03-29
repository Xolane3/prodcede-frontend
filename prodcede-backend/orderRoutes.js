const express = require('express');
const db = require('./db');
const router = express.Router();

// Create an order
router.post('/order', (req, res) => {
  const { user_id, item, status } = req.body;

  db.query(
    'INSERT INTO orders (user_id, item, status) VALUES (?, ?, ?)',
    [user_id, item, status],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: 'Order created' });
    }
  );
});

module.exports = router;
