// routes/leads.js
const express = require("express");
const router = express.Router();
const ContactLead = require("../models/ContactLead"); // reuse same model
const authenticateToken = require("../middleware/auth");
// 📌 Get All Leads
router.get("/",authenticateToken, async (req, res) => {
  const leads = await ContactLead.find();
  res.json(leads);
});


// ✏️ Edit (Update) Lead
router.put("/:id", async (req, res) => {
  try {
    const updatedLead = await ContactLead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json(updatedLead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ Delete Lead
router.delete("/:id", async (req, res) => {
  try {
    const deletedLead = await ContactLead.findByIdAndDelete(req.params.id);
    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
