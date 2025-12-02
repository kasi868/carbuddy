// const express = require('express');
// const jwt = require('jsonwebtoken');
// const Register = require('../models/register');
// const router = express.Router();

// // Middleware to verify JWT
// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) return res.status(401).json({ message: 'No token provided' });

//   const token = authHeader.split(' ')[1];

//   jwt.verify(token, 'your_jwt_secret_key', (err, decoded) => {
//     if (err) return res.status(403).json({ message: 'Token invalid' });

//     req.user = decoded;
//     next();
//   });
// };


// router.get('/', authMiddleware, async (req, res) => {
//   console.log('Decoded user:', req.user); // <--- add this line

//   try {
//     const user = await Register.findById(req.user.userId);
//     console.log('Found user:', user);     // <--- add this line

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json(user);
//   } catch (err) {
//     console.error('Error in /profile:', err);  // <--- add this line
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.put('/', authMiddleware, async (req, res) => {
//   try {
//     const { name, phone, carDetails, profilePic } = req.body;

//     const updateData = {
//       name,
//       phone,
//       carDetails,
//     };

//     // Only include profilePic if it's provided
//     if (profilePic) {
//       updateData.profilePic = profilePic;
//     }

//     const updatedUser = await Register.findByIdAndUpdate(
//       req.user.userId,
//       updateData,
//       { new: true }
//     );

//     if (!updatedUser) return res.status(404).json({ message: 'User not found' });

//     res.json(updatedUser);
//   } catch (err) {
//     console.error('Error updating profile:', err);
//     res.status(500).json({ message: 'Failed to update profile' });
//   }
// });

// module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const Register = require('../models/register');
const { carTypeMap, planPricing, durationMultipliers } = require('../constants/carMapping');
const router = express.Router();

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, 'your_jwt_secret_key', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token invalid' });
    req.user = decoded;
    next();
  });
};

// Get profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await Register.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error in /profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { name, phone, carDetails, profilePic } = req.body;

    let updateData = { name, phone, carDetails };

    // Handle profile picture
    if (profilePic) updateData.profilePic = profilePic;

    // Validate & enrich car details
    if (carDetails && carDetails.carName) {
      const carType = carTypeMap[carDetails.carName] || "Unknown";
      const basePrice = planPricing[carType] || 0;
      const months = durationMultipliers[carDetails.planDuration] || 1;
      const planAmount = basePrice * months;

      updateData.carDetails = {
        ...carDetails,
        carType,
        planAmount,
      };
    }

    const updatedUser = await Register.findByIdAndUpdate(req.user.userId, updateData, { new: true });

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

module.exports = router;