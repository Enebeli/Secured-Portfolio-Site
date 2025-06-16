const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, '..', 'public', 'contact.html'));
});

router.post('/', (req, res) => {
  const { name, message } = req.body;
  console.log(`Message from ${name}: ${message}`);
  res.json({ success: true, message: 'Thanks for contacting me!' });
});

module.exports = router;
