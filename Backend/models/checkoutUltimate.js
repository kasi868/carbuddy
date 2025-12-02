// models/checkoutUltimate.js
const mongoose = require("mongoose");

const ultimateSchema = new mongoose.Schema({  // same fields
  name: String,
  email: String,
  phone: String,
  address: String,
  timeSlot: String,
  service: { type: String, default: "Ultimate Car Wash" },
  price: Number,
  gst: Number,
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
 });

module.exports = mongoose.model("ultimate", ultimateSchema);
