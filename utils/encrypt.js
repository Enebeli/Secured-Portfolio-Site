const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); 
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');  

function encrypt(text) {
  try {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  } catch (err) {
    console.error('Encryption error:', err.message);
    return '';
  }
}

module.exports = encrypt;
