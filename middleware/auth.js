const jwt = require('jsonwebtoken');
const db = require('../config/database');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const auth = req.headers['authorization'];
  const token = auth.replace('Bearer ', '');
  if (!token) return res.status(403).send('Token is required.');
  
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(401).send('Unauthorized.');
    req.userId = decoded.id;
    const user = await db.User.findOne({ where: { id: decoded.id } });
    if (!user) return res.status(404).send('Unauthorized.');
    next();
  });
};

module.exports = verifyToken;
