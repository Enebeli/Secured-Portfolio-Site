const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'No token. Access denied.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
}

module.exports = verifyToken;
