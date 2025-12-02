import React, { useState } from "react";
import { useCheckoutUltimateMutation } from "../services/apiService";

const CheckoutUltimate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    timeSlot: "",
    service: "Diamond",
    price: 999,
    gst: 179.82,
    total: 1178.82,
  });

  const [checkoutUltimate] = useCheckoutUltimateMutation();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await checkoutUltimate(formData).unwrap();
      alert("Order placed successfully! (Ultimate)");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        timeSlot: "",
        service: "Ultimate Car Wash",
        price: 999,
        gst: 179.82,
        total: 1178.82,
      });
    } catch (err) {
      console.error("CheckoutUltimate error:", err);
      alert(err?.data?.message || err?.error || "Something went wrong");
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen py-6 px-4 sm:px-6 md:px-10">
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
        
        {/* Billing Form */}
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Billing Details</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-yellow-400 focus:outline-none focus:ring-2 sm:px-4 sm:py-2"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-yellow-400 focus:outline-none focus:ring-2 sm:px-4 sm:py-2"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-yellow-400 focus:outline-none focus:ring-2 sm:px-4 sm:py-2"
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-yellow-400 focus:outline-none focus:ring-2 sm:px-4 sm:py-2"
                rows="3"
                placeholder="Street, City, Pincode"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Select Time Slot</label>
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:px-4 sm:py-2"
                required
              >
                <option value="">Select a time slot</option>
                {/* Full 5:30 AM to 11 PM slots */}
                {Array.from({ length: 35 }).map((_, idx) => {
                  const hour = 5 + Math.floor(idx / 2);
                  const minute = idx % 2 === 0 ? "30" : "00";
                  const nextHour = minute === "30" ? hour + 1 : hour + 1;
                  const nextMinute = minute === "30" ? "00" : "30";
                  const start = `${hour}:${minute}`;
                  const end = `${nextHour}:${nextMinute}`;
                  return (
                    <option key={idx} value={`${start}-${end}`}>
                      {`${hour % 12 || 12}:${minute} ${hour < 12 ? "AM" : "PM"} - ${nextHour % 12 || 12}:${nextMinute} ${nextHour < 12 ? "AM" : "PM"}`}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 text-black font-semibold py-2 sm:py-3 rounded shadow-sm"
            >
              Place Order
            </button>

          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm sm:text-base text-gray-800">
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
            <div className="flex justify-between font-semibold text-black border-t pt-2">
              <span>Total:</span>
              <span>₹{formData.total}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutUltimate;
