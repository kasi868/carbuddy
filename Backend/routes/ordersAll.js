// routes/ordersAll.js
const express = require("express");
const router = express.Router();
const CheckoutBasic = require("../models/checkoutBasic");
const CheckoutPremium = require("../models/checkoutPremium");
const CheckoutUltimate = require("../models/checkoutUltimate");
const authenticateToken = require("../middleware/auth");
router.get("/",authenticateToken, async (req, res) => {
  try {
    const basic = await CheckoutBasic.find();
    const premium = await CheckoutPremium.find();
    const ultimate = await CheckoutUltimate.find();

    const allOrders = [
      ...basic.map(o => ({ ...o.toObject(), serviceType: "Basic" })),
      ...premium.map(o => ({ ...o.toObject(), serviceType: "Premium" })),
      ...ultimate.map(o => ({ ...o.toObject(), serviceType: "Ultimate" })),
    ];

    // Sort by latest first
    allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(allOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
});

module.exports = router;
