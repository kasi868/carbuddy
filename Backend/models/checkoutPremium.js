// models/checkoutPremium.js
const mongoose = require("mongoose");


  const premiumSchema = new mongoose.Schema({  
    name: String,
  email: String,
  phone: String,
  address: String,
  timeSlot: String,
  service: { type: String, default: "Premium Car Wash" },
  price: Number,
  gst: Number,
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
 });

module.exports = mongoose.model("premium", premiumSchema);
