// routes/forgotRoute.js
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/register"); // make sure this points to your Mongoose model

const router = express.Router();

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Reset user password by email
 * @access  Public
 */
router.post("/forgot-password", async (req, res) => {
  try {
    console.log("👉 Incoming forgot-password request:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found for email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    user.password = hashedPassword;
    // await user.save();
    await User.updateOne({ _id: user._id }, { password: hashedPassword });


    console.log("✅ Password updated for:", email);
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
