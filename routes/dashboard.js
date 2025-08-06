const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User');
const decrypt = require('../utils/decrypt');

router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send('User not found');

    const decryptedUser = {
      name: user.username,
      email: decrypt(user.email),
      bio: decrypt(user.bio)
    };

    res.render('dashboard', { user: decryptedUser });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
