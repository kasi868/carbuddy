import React, { useEffect, useState } from "react";
import { useGetLoggedInUserQuery, useUpdateCustomerMutation } from "../services/apiService";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import userprofile from "../assets/default-user.jpg";
import { carTypeMap, planPricing } from "../constants/carMapping";
import { useGetUserPlansQuery } from "../services/plansApi";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetLoggedInUserQuery();
  const [updateCustomer] = useUpdateCustomerMutation();

  const userId = user?._id;
  const { data: plans = [], isLoading: plansLoading } = useGetUserPlansQuery(userId, {
    skip: !userId,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: "",
    carName: "",
    carColor: "",
    carNumber: "",
    carType: "",
    planDuration: "",
    planAmount: 0,
    timeSlot: "",
    address: "",
    parking: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        profilePic: user.profilePic || "",
        carName: user.carDetails?.carName || "",
        carColor: user.carDetails?.carColor || "",
        carNumber: user.carDetails?.carNumber || "",
        carType: user.carDetails?.carType || "",
        planDuration: user.carDetails?.planDuration || "",
        planAmount: user.carDetails?.planAmount || 0,
        timeSlot: user.carDetails?.timeSlot || "",
        address: user.carDetails?.address || "",
        parking: user.carDetails?.parking || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === "carName") {
      const type = carTypeMap[value] || "";
      updatedData.carType = type;
      if (type && updatedData.planDuration) {
        const amount = planPricing[type] * parseInt(updatedData.planDuration, 10);
        updatedData.planAmount = amount;
      }
    }

    if (name === "planDuration") {
      if (formData.carType) {
        const amount = planPricing[formData.carType] * parseInt(value, 10);
        updatedData.planAmount = amount;
      }
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: user._id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      profilePic: formData.profilePic,
      carDetails: {
        carName: formData.carName,
        carColor: formData.carColor,
        carNumber: formData.carNumber,
        carType: formData.carType,
        planDuration: formData.planDuration,
        planAmount: formData.planAmount,
        timeSlot: formData.timeSlot,
        address: formData.address,
        parking: formData.parking,
      },
    };

    try {
      await updateCustomer(payload).unwrap();
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed");
    }
  };

  if (isLoading)
    return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
      <section>
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
          <div className="bg-[#1f2937] rounded-xl p-8 w-full max-w-6xl">
            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <div className="w-full h-full rounded-full border-4 border-yellow-400 overflow-hidden">
                  <img
                    src={formData.profilePic || userprofile}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute bottom-0 right-0 bg-yellow-500 p-1 rounded-full cursor-pointer">
                  <FaEdit />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData((prev) => ({
                            ...prev,
                            profilePic: reader.result,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {!isEditing && (
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  className="flex justify-end bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Details */}
                <div className="bg-[#111827] p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4">
                    {formData.name}
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-2 rounded ${
                        !isEditing
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-800 text-white"
                      }`}
                      placeholder="Username"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-2 rounded ${
                        !isEditing
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-800 text-white"
                      }`}
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-2 rounded ${
                        !isEditing
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-800 text-white"
                      }`}
                      placeholder="Phone"
                    />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-2 rounded ${
                        !isEditing
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-800 text-white"
                      }`}
                      placeholder="Address"
                    />
                  </div>
                </div>

                {/* Car Details */}
                <div className="bg-[#111827] p-6 rounded-lg">
                  <h2 className="text-2xl text-yellow-400 font-bold text-center mb-4">
                    Car Details
                  </h2>
                  <div className="space-y-4">
                    <select
                      name="carName"
                      value={formData.carName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-2 rounded ${
                        !isEditing
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-800 text-white"
                      }`}
                    >
                      <option value="">Select Car</option>
                      {Object.keys(carTypeMap).map((car) => (
                        <option key={car} value={car}>
                          {car}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      name="carType"
                      value={formData.carType}
                      readOnly
                      className="w-full p-2 rounded bg-gray-600 text-gray-300"
                      placeholder="Car Type"
                    />

                    <input
                      type="text"
                      name="carColor"
                      placeholder="Car Color"
                      value={formData.carColor}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-2 rounded ${
                        !isEditing
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-800 text-white"
                      }`}
                    />
                    <input
                      type="text"
                      name="carNumber"
                      placeholder="Car Number"
                      value={formData.carNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-2 rounded ${
                        !isEditing
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-800 text-white"
                      }`}
                    />

                    <select
                      name="planDuration"
                      value={formData.planDuration}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-2 rounded ${
                        !isEditing
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-800 text-white"
                      }`}
                    >
                      <option value="">Select Plan</option>
                      <option value="1">1 Month</option>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                      <option value="12">12 Months</option>
                    </select>

                    {/* Price */}
                    <input
                      type="text"
                      name="planAmount"
                      value={formData.planAmount}
                      readOnly
                      className="w-full p-2 rounded bg-gray-600 text-gray-300"
                      placeholder="Plan Price"
                    />

                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-2 rounded ${
                        !isEditing
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-800 text-white"
                      }`}
                    >
                      <option value="">Select Time Slot</option>
                      {Array.from({ length: 14 }).map((_, idx) => {
                        const startHour = 5 + Math.floor(idx / 2);
                        const startMinute = idx % 2 === 0 ? "00" : "30";
                        let endHour = startHour;
                        let endMinute = startMinute === "00" ? "30" : "00";
                        if (startMinute === "30") endHour += 1;

                        return (
                          <option
                            key={idx}
                            value={`${startHour}:${startMinute}-${endHour}:${endMinute}`}
                          >
                            {`${startHour % 12 || 12}:${startMinute} ${
                              startHour < 12 ? "AM" : "PM"
                            } - ${endHour % 12 || 12}:${endMinute} ${
                              endHour < 12 ? "AM" : "PM"
                            }`}
                          </option>
                        );
                      })}
                    </select>

                    <textarea
                      name="parking"
                      placeholder="Parking Slot"
                      value={formData.parking}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-2 rounded ${
                        !isEditing
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-800 text-white"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center mt-6 space-x-4">
                {isEditing ? (
                  <button
                    type="submit"
                    className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-400"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-green-400 text-black px-6 py-2 rounded hover:bg-yellow-400"
                    onClick={() => navigate("/checkout", { state: { formData } })}
                  >
                    Continue to Checkout
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* My Plans */}
      <section className="bg-black text-white px-4 py-10">
        <h2 className="text-3xl text-yellow-400 font-bold mb-6 text-center">
          My Plans
        </h2>
        {plansLoading ? (
          <p className="text-center text-gray-400">Loading plans...</p>
        ) : plans.length === 0 ? (
          <p className="text-center text-gray-400">No plans found</p>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="flex w-full md:w-96 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300"
              >
                <div className="w-2 bg-yellow-400"></div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">
                      {plan.carName} ({plan.carType})
                    </h3>
                    <p className="text-gray-300 mb-1"><strong>Color:</strong> {plan.carColor}</p>
                    <p className="text-gray-300 mb-1"><strong>Number:</strong> {plan.carNumber}</p>
                    <p className="text-gray-300 mb-1"><strong>Duration:</strong> {plan.planDuration} month(s)</p>
                    <p className="text-gray-300 mb-1"><strong>Amount:</strong> ₹{plan.planAmount}</p>
                    <p className="text-gray-300 mb-1"><strong>Time Slot:</strong> {plan.timeSlot}</p>
                    <p className="text-gray-300 mb-1"><strong>Parking:</strong> {plan.parking}</p>
                  </div>
                  <div className="mt-3 text-gray-400 text-sm flex justify-between">
                    <span><strong>Start:</strong> {new Date(plan.startDate).toLocaleDateString()}</span>
                    <span><strong>End:</strong> {new Date(plan.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
