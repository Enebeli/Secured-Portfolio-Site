const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String }, // Not required for Google users
  role:     { type: String, enum: ['User', 'Admin'], default: 'User' }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
