
// // EmployeeSidebar.jsx
// import React from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// const EmployeeSidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     // Clear all employee-related data
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");
//     localStorage.removeItem("role");
//     localStorage.removeItem("userId");

//     navigate("/login");
//   };

//   const links = [
//     { name: "Home", path: "/dashboard/EmpDashboard" },
//     { name: "My Leads", path: "/dashboard/EmployeeLeads" }
    
//   ];

//   return (
//     <aside className="w-64 bg-black text-white flex flex-col p-6 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Employee Panel</h1>

//       <nav className="flex flex-col space-y-3 flex-1">
//         {links.map((link) => (
//           <Link
//             key={link.path}
//             to={link.path}
//             className={`px-3 py-2 rounded hover:text-yellow-500 ${
//               location.pathname === link.path ? "bg-gray-800" : ""
//             }`}
//           >
//             {link.name}
//           </Link>
//         ))}
//         <button
//         onClick={handleLogout}
//         className="mt-6 px-4 py-2 text-left hover:text-yellow-500 text-white"
//       >
//         Logout
//       </button>
//       </nav>

      
//     </aside>
//   );
// };

// export default EmployeeSidebar;


// EmployeeSidebar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const EmployeeSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    navigate("/login");
  };

  const links = [
    { name: "Home", path: "/dashboard/EmpDashboard" },
    { name: "My Leads", path: "/dashboard/EmployeeLeads" },
  ];

  return (
    <>
      {/* 🔹 Topbar with toggle (Mobile + Tablet) */}
      <div className="lg:hidden flex items-center justify-between bg-black text-white px-4 py-3">
        <h1 className="text-xl font-bold">Employee Panel</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 🔹 Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 transform bg-black text-white w-64 p-6 z-50
          lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <h1 className="text-2xl font-bold mb-6 hidden lg:block">Employee Panel</h1>

        <nav className="flex flex-col space-y-3 flex-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)} // close after click on mobile/tablet
              className={`px-3 py-2 rounded hover:text-yellow-500 ${
                location.pathname === link.path ? "bg-gray-800" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 text-left hover:text-yellow-500 text-white"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default EmployeeSidebar;
