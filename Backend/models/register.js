
// const mongoose = require('mongoose');
// const AREAS = require("../constants/areas");

// const registerSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   phone: String,
//   profilePic: String,
//   role: {
//     type: String,
//     enum: ['user', 'admin', 'employee'],
//     default: 'user',
//   },
//   area: {
//     type: String,
//     enum: AREAS,
//     default: "",
//   },
//   carDetails: {
//     carName: String,
   
//     carColor: String,
//     carNumber: String,
//     carType: String,   // auto-filled on backend
//     planDuration: String, // "1", "3", "6", "12"
//     planAmount: Number,   // auto-filled on backend
//     timeSlot: String,     // e.g. "5:30 AM - 6:00 AM"
//     address: {
//       type: String,
//       enum: AREAS,
//       default: "",
//     },
//     parking: String,
//   }
// });

// module.exports = mongoose.model('Register', registerSchema);

const mongoose = require('mongoose');
const AREAS = require("../constants/areas");

const planSchema = new mongoose.Schema({
  carName: String,
  carColor: String,
  carNumber: String,
  carType: String,       // auto-filled on backend
  planDuration: String,  // "1", "3", "6", "12"
  planAmount: Number,    // auto-filled on backend
  timeSlot: String,      // e.g. "5:30 AM - 6:00 AM"
  address: {
    type: String,
    // enum: AREAS,
    default: "",
  },
  parking: String,
  status: {
    type: String,
    enum: ['active', 'expired', 'pending'],
    default: 'pending',
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
});

const registerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  profilePic: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'employee'],
    default: 'user',
  },
  area: {
    type: String,
    // enum: AREAS,
    default: "",
  },
  plans: [planSchema], // <-- now each user can have multiple plans
});

module.exports = mongoose.model('Register', registerSchema);
