// plans.js
const express = require('express');
const router = express.Router();
const Register = require('../models/register');
const { carTypeMap, planPricing } = require('../constants/carMapping');

// @route   POST /api/plans/:userId
// @desc    Add a new plan for a user
// @access  Private (user must be authenticated)
router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { planDuration, carName, carNumber, carColor, timeSlot, address, parking } = req.body;

    // Auto-calculate carType and planAmount
    const carType = carTypeMap[carName] || "";
    if (!carType) return res.status(400).json({ message: "Invalid car selected" });

    const planAmount = planPricing[carType] * parseInt(planDuration, 10);
    const discountedAmount = Math.round(planAmount * 0.8); // 20% discount
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + parseInt(planDuration));

    const newPlan = {
      carName,
      carType,
      carColor,
      carNumber,
      planDuration,
      planAmount,
      discountedAmount,
     // Assuming no discount logic for now
      timeSlot,
      address,
      parking,
      status: 'active',
      startDate,
      endDate,
    };

    const updatedUser = await Register.findByIdAndUpdate(
      userId,
      { $push: { plans: newPlan } },
      { new: true }
    );

    res.status(200).json({ message: "Plan added successfully", plans: updatedUser.plans });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// GET /api/plans
// Fetch all plans from all users
router.get('/', async (req, res) => {
  try {
    const users = await Register.find().select('name email phone plans');

    // Flatten plans with user info
    const allPlans = users.flatMap(user =>
      user.plans.map(plan => ({
        userId: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        carName: plan.carName,
        carType: plan.carType,
        carColor: plan.carColor,
        carNumber: plan.carNumber,
        planDuration: plan.planDuration,
        planAmount: plan.planAmount,
        discountedAmount: plan.discountedAmount || Math.round(plan.planAmount * 0.8),
        timeSlot: plan.timeSlot,
        parking: plan.parking,
        address: plan.address,
        status: plan.status,
        startDate: plan.startDate,
        endDate: plan.endDate,
        createdAt: plan.createdAt || plan.startDate,
      }))
    );

    res.status(200).json(allPlans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// @route   GET /api/plans/:userId
// @desc    Get all plans of a user
// @access  Private
router.get('/:userId', async (req, res) => {
  try {
    const user = await Register.findById(req.params.userId).select('plans');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.plans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PATCH /api/plans/:userId/:planId
// @desc    Update plan status (active/expired)
// @access  Private
router.patch('/:userId/:planId', async (req, res) => {
  try {
    const { status } = req.body;
    const { userId, planId } = req.params;

    const user = await Register.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const plan = user.plans.id(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    plan.status = status || plan.status;
    await user.save();

    res.status(200).json({ message: "Plan updated", plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
