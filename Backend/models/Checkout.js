const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    carName: { type: String, required: true },
    carType: { type: String, required: true },
    carColor: { type: String, required: true },
    carNumber: { type: String, required: true },
    planDuration: { type: Number, required: true },
    timeSlot: { type: String, required: true },
    address: { type: String, required: true },
    parking: { type: String, required: true },
    discountedAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Checkout", checkoutSchema);
