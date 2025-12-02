

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeSidebar from "./EmployeeSidebar";

export default function EmpDashboard() {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "employee") {
      navigate("/"); // redirect others to homepage
    }
  }, [role, navigate]);

  return (
  <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f0f0f] text-white font-sans">
      {/* Sidebar */}
      <EmployeeSidebar />

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Employee <span className="text-[#FFD700]">Dashboard</span>
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-[#1a1a1a] p-4 sm:p-6 rounded-xl shadow text-center">
            <h4 className="text-gray-400">My Profile</h4>
            <p className="text-sm sm:text-base mt-2">
              <span className="font-semibold">Email:</span> {email}
            </p>
          </div>

           

          
        </div>

      </main>
    </div>
);

}
