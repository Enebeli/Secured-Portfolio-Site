const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User');
const encrypt = require('../utils/encrypt');
const decrypt = require('../utils/decrypt');

// GET profile form
router.get('/', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).send('User not found');

  res.render('profile', {
    user: {
      name: user.username,
      email: decrypt(user.email),
      bio: decrypt(user.bio)
    },
    errors: null,
    csrfToken: req.csrfToken() 
  });
});

// POST profile update
router.post('/',
  verifyToken,
  [
    body('name')
      .trim()
      .isAlpha('en-US', { ignore: ' ' }).withMessage('Name must contain only letters')
      .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters'),

    body('email')
      .isEmail().withMessage('Invalid email'),

    body('bio')
      .trim()
      .isLength({ max: 500 }).withMessage('Bio too long')
      .escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('profile', {
        user: req.body,
        errors: errors.array()
      });
    }

    try {
      const { name, email, bio } = req.body;

      await User.findByIdAndUpdate(req.user.id, {
        username: name,
        email: encrypt(email),
        bio: encrypt(bio)
      });

      res.redirect('/dashboard');
    } catch (err) {
      res.status(500).send('Update failed');
    }
  }
);

module.exports = router;
