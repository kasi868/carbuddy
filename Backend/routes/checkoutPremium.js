

const express = require("express");
const router = express.Router();
const CheckoutPremium=require("../models/checkoutPremium")
const authenticateToken = require("../middleware/auth");
router.post("/",async (req, res) => {
  try {
      console.log("checkoutPremium route hit");
    const order = new CheckoutPremium(req.body);
    await order.save();
    res.status(201).json({ message: "Premium Order saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving order", error: err.message });
  }
});

module.exports = router;


