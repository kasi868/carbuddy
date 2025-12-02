const express = require("express");
const router = express.Router();
const Checkout = require("../models/Checkout");

// Add a new plan/checkout
router.post("/add", async (req, res) => {
  try {
    const { userId, planData } = req.body;

    if (!userId || !planData) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const checkout = new Checkout({
      userId,
      ...planData,
    });

    await checkout.save();
    res.status(201).json({ message: "Plan added successfully", checkout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all checkouts/orders for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Checkout.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
