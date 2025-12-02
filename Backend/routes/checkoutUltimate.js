

const express = require("express");
const router = express.Router();
const CheckoutUltimate=require("../models/checkoutUltimate")
const authenticateToken = require("../middleware/auth");
router.post("/", async (req, res) => {
  try {
      console.log("checkoutPremium route hit");
    const order = new CheckoutUltimate(req.body);
    await order.save();
    res.status(201).json({ message: "Ultimate Order saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving order", error: err.message });
  }
});

module.exports = router;


