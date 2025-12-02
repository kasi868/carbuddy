import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AREAS from "../constants/areas";

export default function ManageEmployees() {
  const [employees, setEmployees] = useState([]);
  const [areas, setAreas] = useState({});

  // Fetch employees
 useEffect(() => {
  fetch("https://carsbuddy.net/backend/api/register/employees") // 👈 now correct
    .then((res) => res.json())
    .then((data) => {
      console.log("Employees API Response:", data);
      setEmployees(data);

      // init state for employee areas
      const initAreas = {};
      data.forEach((e) => {
        initAreas[e._id] = e.area || "";
      });
      setAreas(initAreas);
    })
    .catch((err) => console.error(err));
}, []);


  // Handle input change
  const handleAreaChange = (id, value) => {
    setAreas((prev) => ({ ...prev, [id]: value }));
  };

  // Save updated area to backend
  const handleSave = async (id) => {
    const res = await fetch(`http://localhost:5000/api/register/employee/${id}/area`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ area: areas[id] }),
    });

    const data = await res.json();
    alert(data.message || "Updated!");
  };

  return (
    // <div className="flex min-h-screen bg-black text-white">
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f0f0f] text-white font-sans">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-[#FFD700]">Manage Employees</span>
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1a1a1a] rounded">
            <thead className="bg-gray-800 text-gray-400">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Assigned Apartment</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2">
                    <select
                      value={areas[emp._id] || ""}
                      onChange={(e) => handleAreaChange(emp._id, e.target.value)}
                      className="p-2 rounded bg-gray-800 text-white"
                    >
                      <option value="">-- Select Apartment--</option>
                      {AREAS.map((area, idx) => (
                        <option key={idx} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleSave(emp._id)}
                      className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-400 py-4">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>


  );
}
