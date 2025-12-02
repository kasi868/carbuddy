const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const customersRoute = require('./routes/customers'); // ✅
const contactRoutes = require("./routes/contact");
const leadsRoutes = require("./routes/leads");
const profileRoutes=require("./routes/profile")
const checkoutBasic = require("./routes/checkoutBasic");
const checkoutPremium = require("./routes/checkoutPremium");
const checkoutUltimate = require("./routes/checkoutUltimate");
const allOrders=require("./routes/ordersAll");
const forgotRoute = require("./routes/forgotRoute");
const planRoutes = require('./routes/plans');
const checkoutRoutes = require("./routes/checkout");

// server.js

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://hackerpratap7:Pratap%402345@cluster0.6mmtkxm.mongodb.net/Carbuddy?retryWrites=true&w=majority', {  // lowercase 'b'
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));
app.use((req, res, next) => {
  console.log("👉 Incoming:", req.method, req.url);
  next();
});
app.get("/",(req,res)=>{
return res.sendStatus(200);
});
app.use('/backend/api/register', registerRoutes);
app.use('/backend/api/login', loginRoutes);

app.use('/backend/api/customers', require('./routes/customers'));
app.use("/backend/api/contact", contactRoutes);
app.use("/backend/api/leads", leadsRoutes);
app.use('/backend/api/profile',profileRoutes);
app.use('/backend/api/plans', planRoutes);
app.use("/backend/api/checkout", checkoutRoutes);
app.use("/backend/api/checkoutUltimate", checkoutUltimate);
app.use("/backend/api/checkoutBasic", checkoutBasic);
app.use("/backend/api/checkoutPremium", checkoutPremium);

app.use("/backend/api/allOrders",allOrders);
app.use("/backend/api/auth", forgotRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
