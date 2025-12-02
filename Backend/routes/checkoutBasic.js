
const express = require("express");
const router = express.Router();
const CheckoutBasic = require("../models/checkoutBasic");
const authenticateToken = require("../middleware/auth");
router.post("/", async (req, res) => {
  try {
    console.log("checkoutBasic route hit");
    const order = new CheckoutBasic(req.body);
    await order.save();
    res.status(201).json({ message: "Order saved successfully! (Basic)" });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ message: "Error saving order", error: err.message });
  }
});

module.exports = router;


