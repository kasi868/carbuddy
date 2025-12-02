// Backend/middleware/auth.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Get the token from "Bearer <token>"

  if (!token) return res.status(401).json({ error: 'Access denied, token missing' });

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user; // Set the decoded user in the request
    next();
  });
}

module.exports = authenticateToken;