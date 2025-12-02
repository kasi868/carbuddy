import React, { useState } from "react";
import { useCheckoutPremiumMutation } from "../services/apiService";

const CheckoutPremium = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    timeSlot: "",
    service: "Premium Car Wash",
    price: 499,
    gst: 89.82,
    total: 588.82,
  });

  const [checkoutPremium] = useCheckoutPremiumMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await checkoutPremium(formData).unwrap();
      alert("Order placed successfully! (Premium)");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        timeSlot: "",
        service: "Premium Car Wash",
        price: 499,
        gst: 89.82,
        total: 588.82,
      });
    } catch (err) {
      console.error("CheckoutPremium error:", err);
      alert(err?.data?.message || err?.error || "Something went wrong");
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen py-10 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Form */}
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing Details</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, City, Pincode"
                rows="3"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Select Time Slot</label>
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
               <option value="">Select a time slot</option>
  <option value="5:30-6:00">5:30 AM - 6:00 AM</option>
  <option value="6:00-6:30">6:00 AM - 6:30 AM</option>
  <option value="6:30-7:00">6:30 AM - 7:00 AM</option>
  <option value="7:00-7:30">7:00 AM - 7:30 AM</option>
  <option value="7:30-8:00">7:30 AM - 8:00 AM</option>
  <option value="8:00-8:30">8:00 AM - 8:30 AM</option>
  <option value="8:30-9:00">8:30 AM - 9:00 AM</option>
  <option value="9:00-9:30">9:00 AM - 9:30 AM</option>
  <option value="9:30-10:00">9:30 AM - 10:00 AM</option>
  <option value="10:00-10:30">10:00 AM - 10:30 AM</option>
  <option value="10:30-11:00">10:30 AM - 11:00 AM</option>
  <option value="11:00-11:30">11:00 AM - 11:30 AM</option>
  <option value="11:30-12:00">11:30 AM - 12:00 PM</option>
  <option value="12:00-12:30">12:00 PM - 12:30 PM</option>
  <option value="12:30-1:00">12:30 PM - 1:00 PM</option>
  <option value="1:00-1:30">1:00 PM - 1:30 PM</option>
  <option value="1:30-2:00">1:30 PM - 2:00 PM</option>
  <option value="2:00-2:30">2:00 PM - 2:30 PM</option>
  <option value="2:30-3:00">2:30 PM - 3:00 PM</option>
  <option value="3:00-3:30">3:00 PM - 3:30 PM</option>
  <option value="3:30-4:00">3:30 PM - 4:00 PM</option>
  <option value="4:00-4:30">4:00 PM - 4:30 PM</option>
  <option value="4:30-5:00">4:30 PM - 5:00 PM</option>
  <option value="5:00-5:30">5:00 PM - 5:30 PM</option>
  <option value="5:30-6:00">5:30 PM - 6:00 PM</option>
  <option value="6:00-6:30">6:00 PM - 6:30 PM</option>
  <option value="6:30-7:00">6:30 PM - 7:00 PM</option>
  <option value="7:00-7:30">7:00 PM - 7:30 PM</option>
  <option value="7:30-8:00">7:30 PM - 8:00 PM</option>
  <option value="8:00-8:30">8:00 PM - 8:30 PM</option>
  <option value="8:30-9:00">8:30 PM - 9:00 PM</option>
  <option value="9:00-9:30">9:00 PM - 9:30 PM</option>
  <option value="9:30-10:00">9:30 PM - 10:00 PM</option>
  <option value="10:00-10:30">10:00 PM - 10:30 PM</option>
  <option value="10:30-11:00">10:30 PM - 11:00 PM</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 text-black font-semibold py-3 rounded-md shadow-md"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
          <div className="space-y-4 text-gray-800 text-sm sm:text-base">
            <div className="flex justify-between border-b pb-2">
              <span>Service:</span>
              <span className="font-bold">{formData.service}</span>
            </div>
            <div className="flex justify-between">
              <span>Price:</span>
              <span>₹{formData.price}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%):</span>
              <span>₹{formData.gst}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total:</span>
              <span>₹{formData.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPremium;
