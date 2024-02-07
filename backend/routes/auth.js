const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateAccessToken, authenticateToken } = require('../auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('Invalid credentials');

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) return res.status(400).send('Invalid credentials');

  const accessToken = generateAccessToken(user.username);
  res.json({ accessToken });
});

router.post('/logout', authenticateToken, (req, res) => {
  // Here you can add logic to invalidate the current user's token
  res.send('Logged out');
});

module.exports = router;
