import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
        localStorage.removeItem("userId");

    setToken(null);
    setDropdownOpen(false);
    setMenuOpen(false); // ✅ close menu on logout
    navigate("/login");
  };

  const handleProfileClick = () => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);

    if (!currentToken) {
      navigate("/login");
      setMenuOpen(false); // ✅ close menu when redirecting to login
    } else {
      setDropdownOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <nav className="w-full bg-black text-white px-6 py-4 flex items-center justify-between z-50 relative">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/">
          <img
            src={logo}
            alt="Cars Buddy"
            style={{ height: "80px" }}
            className=" w-auto"
          />
          </Link>
          <div>
            <h1 className="text-4xl font-bold">
              <span className="text-yellow-400">Cars</span>Buddy
            </h1>
            <p className="text-sm text-center">
              <span className="text-yellow-400">personalized Car Care</span>
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        {/* <ul className="hidden md:flex flex-row space-x-6 font-medium text-base"> */}
          <ul className="hidden lg:flex flex-row space-x-6 font-medium text-base">
          <Link to="/" className="hover:text-yellow-400 cursor-pointer">
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-400 cursor-pointer">
            About Us
          </Link>
          <Link
            to="/servicespage"
            className="hover:text-yellow-400 cursor-pointer"
          >
            Services
          </Link>
          <Link to="/contact" className="hover:text-yellow-400 cursor-pointer">
            Contact Us
          </Link>
        </ul>

        
        {/* Make Appointment Button - Desktop */}
        {/* <Link to="/Contact">
          <button className="hidden lg:block border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold">
            Make Appointment
          </button>
        </Link> */}

        {/* Right side profile icon */}
        {/* <div className="hidden md:flex items-center space-x-2 relative"> */}
          {/* <div className="hidden lg:flex items-center space-x-2 relative">
          <div
            className="flex items-center space-x-1 cursor-pointer hover:text-yellow-400"
            onClick={handleProfileClick}
          >
            <FaUserCircle size={28} />
            {token && <FaChevronDown size={14} />}
          </div>

          {!token && (
            <Link to="/Login">
              <button className="cursor-pointer hover:text-yellow-400">
                Login
              </button>
            </Link>
          )}

          {dropdownOpen && token && (
            <div className="absolute top-1 right-0  mt-10 w-40 bg-white text-black rounded shadow-lg">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/profilepage");
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div> */}
        <div className="relative">
  {/* If user NOT logged in → Show Login & Signup */}
  {!token && (
    <div className="flex space-x-4">
      <Link to="/login">
        <button className="hidden lg:block border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold">
          Login
        </button>
      </Link>
      <Link to="/register">
        <button className="hidden lg:block border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold">
          Signup
        </button>
      </Link>
    </div>
  )}

    {token && (
    <div className="hidden lg:flex items-center space-x-4">
      {/* Profile Icon (click → profile page) */}
      <button
        onClick={() => navigate("/profilepage")}
        className="flex items-center justify-center rounded-full bg-gray-400"
      >
        {/* You can replace this emoji with an icon (e.g., from lucide-react or FontAwesome) */}
        <FaUserCircle size={28} />
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold"
      >
        Logout
      </button>
    </div>
  )}
  </div>
  
  {/* If user IS logged in → Show dropdown */}
  {/* {dropdownOpen && token && (
    <div className="absolute top-1 right-0 mt-10 w-40 bg-white text-black rounded shadow-lg">
      <button
        onClick={() => {
          setDropdownOpen(false);
          navigate("/profilepage");
        }}
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Profile
      </button>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  )} */}




        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <X className="text-yellow-400 h-7 w-7" />
            ) : (
              <Menu className="text-yellow-400 h-7 w-7" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-black text-white z-50 shadow-md"
          >
            {/* Header in mobile menu */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="Cars Buddy" className="h-8 w-auto" />
                <span className="text-xl font-bold">
                  <span className="text-yellow-400">Cars</span>Buddy
                </span>
              </div>
              <button onClick={toggleMenu}>
                <X className="text-yellow-400 h-7 w-7" />
              </button>
            </div>

            <ul className="flex flex-col px-6 py-6 space-y-6 text-lg">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-400 cursor-pointer"
              >
                Homepage
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-400 cursor-pointer"
              >
                About Us
              </Link>
              <Link
                to="/servicespage"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-400 cursor-pointer"
              >
                Services
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-400 cursor-pointer"
              >
                Contact Us
              </Link>

              <li className="flex flex-col space-y-2">
  {!token ? (
    // 🔹 If user NOT logged in → show Login & Signup
    <div className="flex flex-col space-y-2">
      <Link to="/login">
        <button
          onClick={() => setMenuOpen(false)}
          className="border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold w-full"
        >
          Login
        </button>
      </Link>
      <Link to="/register">
        <button
          onClick={() => setMenuOpen(false)}
          className="border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold w-full"
        >
          Signup
        </button>
      </Link>
    </div>
  ) : (
    // 🔹 If user IS logged in → show Profile + Logout
    
     <div className="flex flex-col space-y-2">
      <button
        onClick={() => {
          navigate("/profilepage");
          setMenuOpen(false);
        }}
        className="border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold w-full"
      >
        {/* <FaUserCircle size={28} /> */}
        profile
      </button>

      <button
        onClick={() => {
          handleLogout();
          setMenuOpen(false);
        }}
        className="border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold w-full"
      >
        Logout
      </button>
    </div>
  )}
</li>

                           </ul>

            {/* <div className="px-6">
              <Link to="/Contact" onClick={() => setMenuOpen(false)}>
                <button className="w-full border border-white px-5 py-3 rounded-full hover:bg-white hover:text-black transition font-semibold">
                  Make Appointment
                </button>
              </Link>
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;