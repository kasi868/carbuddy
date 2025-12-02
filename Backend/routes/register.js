

const express = require("express");
const router = express.Router();
const Register = require("../models/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "super_strong_secret";

const authenticateToken = require("../middleware/auth");

// ✅ helper to escape regex special characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// 🔹 REGISTER new user / employee / admin
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      profilePic,
      carDetails,
      role = "user",
      area,
      assignedEmployee,
    } = req.body;

    // Check if email exists
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user object
    const userData = {
      name,
      email,
      phone,
      profilePic,
      password: hashedPassword,
      role,
      area,
    };

    // 🔹 If registering a user, attach car details + auto-assign employee
    if (role === "user") {
      userData.carDetails = carDetails;

      // Take area from carDetails.address if area not passed
      const userArea = (area || carDetails?.address || "").trim();

      if (userArea) {
        const safeArea = escapeRegex(userArea);

        // Find employee with same area (case-insensitive exact match)
        const employee = await Register.findOne({
          role: "employee",
          area: { $regex: new RegExp(`^${safeArea}$`, "i") },
        });

        if (employee) {
          userData.assignedEmployee = employee._id;
        }
      }
    }

    const newUser = new Register(userData);
    await newUser.save();

    // Create JWT
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(201)
      .json({ message: "Registered successfully", token, user: newUser });
  } catch (error) {
    console.error("Registration Error:", error);
    res
      .status(500)
      .json({ error: "Registration failed", details: error.message });
  }
});

// 🔹 UPDATE user
router.put("/:id", async (req, res) => {
  try {
    const { name, email, role, carDetails, area, assignedEmployee } = req.body;

    const updateData = {
      name,
      email,
      role,
      area,
      assignedEmployee,
      carDetails,
    };

    const updated = await Register.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// 🔹 DELETE user
router.delete("/:id", async (req, res) => {
  try {
    await Register.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// 🔹 GET all users (any role)
router.get("/", async (req, res) => {
  try {
    const users = await Register.find().populate(
      "assignedEmployee",
      "name email"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// 🔹 GET all employees only
router.get("/employees", async (req, res) => {
  try {
    const employees = await Register.find({ role: "employee" });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 UPDATE employee area
router.put("/employee/:id/area", async (req, res) => {
  try {
    const { area } = req.body;

    const updatedEmployee = await Register.findByIdAndUpdate(
      req.params.id,
      { area },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({
      message: "Employee area updated successfully",
      employee: updatedEmployee,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update employee area" });
  }
});

// 🔹 ASSIGN user to employee manually
router.put("/assign/:userId/:employeeId", async (req, res) => {
  try {
    const updatedUser = await Register.findByIdAndUpdate(
      req.params.userId,
      { assignedEmployee: req.params.employeeId },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to assign employee" });
  }
});

// 🔹 Get all leads for an employee based on exact area match
router.get("/employee/:id/leads", async (req, res) => {
  try {
    const employeeId = req.params.id;

    // Fetch the employee
    const employee = await Register.findById(employeeId);
    if (!employee || employee.role !== "employee") {
      return res.status(404).json({ message: "Employee not found" });
    }

    const employeeArea = (employee.area || "").trim();
    const safeArea = escapeRegex(employeeArea);

    // ✅ Exact match with special characters handled
    const leads = await Register.find({
      role: "user",
      "carDetails.address": { $regex: `^${safeArea}$`, $options: "i" },
    });

    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch leads" });
  }
});

module.exports = router;
