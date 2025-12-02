const express = require('express');
const router = express.Router();
const Register = require('../models/register');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {


  const { email, password } = req.body;

  const user = await Register.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

  // ✅ Include role in token
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },  // include role
    'your_jwt_secret_key',
    { expiresIn: '1h' }
  );


  // ✅ Send role back in the response
  res.status(200).json({
    token,
      userId: user._id.toString(),
    email: user.email,
    role: user.role  // <--- this was missing
  });
});

module.exports = router;