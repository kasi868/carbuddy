const express = require('express');
const router = express.Router();
const Register = require('../models/register');
const authenticateToken = require('../middleware/auth');
// const register = require('../models/register');


// GET all users from 'registers' collection
// GET all users from 'registers' collection
router.get('/',authenticateToken, async (req, res) => {
  try {
    const customers = await Register.find(); // if use{ role: 'user' }✅ only users with role 'user'
    res.json(customers);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});




// POST new customer
router.post('/', async (req, res) => {
  try {
    const newUser = new Register(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  console.log('PUT request body:', req.body);
  try {
    const updatedUser = await Register.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    console.error('PUT error:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    await Register.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;