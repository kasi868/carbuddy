// import React from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";
// import { useNavigate } from "react-router-dom";

// const AdminSidebar = () => {
//   const navigate = useNavigate();
//   const handleLogout = () => {
//       localStorage.removeItem("isLoggedIn"); // 👈 REQUIRED to ensure user is logged out
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");
//     localStorage.removeItem("role");
//         localStorage.removeItem("userId");

    
//     navigate("/login");
//   };
//   return (
//     <aside className="w-64 bg-black p-6 min-h-screen">
//       <div className="flex items-center mb-10">
//         <img src={logo} alt="Logo" style={{ height: '140px' }} className="h-10" />
//       </div>
//       <nav className="space-y-4 text-sm">
//         <Link to="/dashboard/AdminDashboard" className="block hover:text-[#FFD700]">
//           Dashboard
//         </Link>
//         {/* <Link to="/admin-added-items" className="block hover:text-[#FFD700]">
//           Added Items
//         </Link> */}
//         <Link to="/dashboard/Customers" className="block hover:text-[#FFD700]">
//           Customers
//         </Link>
//         <Link to="/dashboard/ManageEmployees" className="block hover:text-[#FFD700]">
//           ManageEmployees
//         </Link>
//         <Link to="/dashboard/Leads" className="block hover:text-[#FFD700]">
//           Leads
//         </Link>
//         <Link to="/dashboard/allOrders" className="block hover:text-[#FFD700]">
//           Orders
//         </Link>
//         {/* <Link to="/dashboard/Faq" className="block hover:text-[#FFD700]">
//           FAQ's
//         </Link> */}
       
//         <button className="block hover:text-[#FFD700]" onClick={handleLogout}>
//           Logout
//         </button>
//         {/* <Link to="/login" className="block hover:text-[#FFD700]" >
//           Logout
//         </Link> */}
//       </nav>
//     </aside>
//   );
// };

// export default AdminSidebar;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-black p-4 text-white">
        <img src={logo} alt="Logo" className="h-10" />
        <button onClick={() => setOpen(true)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Sidebar for large screens */}
      <aside className="hidden lg:block w-64 bg-black p-6 min-h-screen text-white">
        <div className="flex items-center mb-10">
          <img src={logo} alt="Logo" className="h-14" />
        </div>
        <nav className="space-y-4 text-sm">
          <Link to="/dashboard/AdminDashboard" className="block hover:text-[#FFD700]">Dashboard</Link>
          <Link to="/dashboard/Customers" className="block hover:text-[#FFD700]">Customers</Link>
          <Link to="/dashboard/ManageEmployees" className="block hover:text-[#FFD700]">ManageEmployees</Link>
          <Link to="/dashboard/Leads" className="block hover:text-[#FFD700]">Leads</Link>
          <Link to="/dashboard/allOrders" className="block hover:text-[#FFD700]">Orders</Link>
          <button className="block hover:text-[#FFD700]" onClick={handleLogout}>Logout</button>
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay background */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setOpen(false)}></div>

          {/* Sidebar Drawer */}
          <div className="relative w-64 bg-black p-6 text-white z-50 min-h-screen">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-2xl"
            >
              <FaTimes />
            </button>
            <div className="flex items-center mb-10">
              <img src={logo} alt="Logo" className="h-14" />
            </div>
            <nav className="space-y-4 text-sm">
              <Link to="/dashboard/AdminDashboard" className="block hover:text-[#FFD700]" onClick={() => setOpen(false)}>Dashboard</Link>
              <Link to="/dashboard/Customers" className="block hover:text-[#FFD700]" onClick={() => setOpen(false)}>Customers</Link>
              <Link to="/dashboard/ManageEmployees" className="block hover:text-[#FFD700]" onClick={() => setOpen(false)}>ManageEmployees</Link>
              <Link to="/dashboard/Leads" className="block hover:text-[#FFD700]" onClick={() => setOpen(false)}>Leads</Link>
              <Link to="/dashboard/allOrders" className="block hover:text-[#FFD700]" onClick={() => setOpen(false)}>Orders</Link>
              <button className="block hover:text-[#FFD700]" onClick={handleLogout}>Logout</button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
