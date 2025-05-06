const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  if (!/^[a-zA-Z0-9_.-]+$/.test(username))
    return res.status(400).json({ error: 'Invalid username' });

  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ error: 'Username already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  res.json({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const { _id } = user;
  res.json({ token, id: _id });
});

module.exports = router;
