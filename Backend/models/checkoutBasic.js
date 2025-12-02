const mongoose = require("mongoose");

const basicSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  timeSlot: String,
  service: { type: String, default: "Basic Car Wash" },
  price: Number,
  gst: Number,
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("basic", basicSchema);
