// routes/contact.js
const express = require("express");
const router = express.Router();
const ContactLead = require("../models/ContactLead");
const authenticateToken = require("../middleware/auth");
router.post("/", async (req, res) => {
  try {
    const lead = new ContactLead(req.body);
    await lead.save();
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    console.error("Error saving contact lead:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
