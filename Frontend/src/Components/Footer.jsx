import React from 'react';
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6 sm:px-12 md:px-24">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

        {/* Left: Logo & Description */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
            <img src={logo} alt="Cars Buddy Logo" className="h-12 sm:h-16" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                <span className="text-yellow-400">Cars</span>Buddy
              </h1>
              <p className="text-xs sm:text-sm mt-1 text-yellow-400 text-center sm:text-left">
                personalized Car Care
              </p>
            </div>
          </div>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-xs">
            Providing Premium Car Cleaning Services That Bring Out the Best in Your Vehicle, Ensuring a Showroom Shine Every Time.
          </p>
          <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <button className="w-full sm:w-auto border border-white rounded-full px-6 sm:px-8 py-2 sm:py-3 text-yellow-400 text-sm sm:text-lg font-semibold hover:bg-white hover:text-black transition">
              Contact Us →
            </button>
          </Link>
        </div>

        {/* Middle: Navigation */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-xl sm:text-2xl text-yellow-400 font-semibold mb-2">Navigation</h4>
          <div className="h-px bg-gray-600 mb-4 w-24 md:w-4/5"></div>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-lg text-gray-400">
            <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/About" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-yellow-400">About</Link></li>
            <li><Link to="/servicespage" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-yellow-400">Services</Link></li>
            <li><Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-yellow-400">Contact Us</Link></li>
          </ul>
        </div>

        {/* Right: Office & Contact Info */}
        <div className="flex flex-col items-center md:items-start space-y-8 sm:space-y-10">
          <div>
            <h4 className="text-xl sm:text-2xl text-yellow-400 font-semibold mb-2">Visit Our Office</h4>
            <div className="h-px bg-gray-600 mb-2 sm:mb-4 w-24 md:w-4/5"></div>
            <p className="text-sm sm:text-lg text-gray-400 leading-relaxed">
             301 SV land mark bachupally hyderabad 500090
            </p>
          </div>
          <div>
            <h4 className="text-xl sm:text-2xl text-yellow-400 font-semibold mb-2">Contact Info</h4>
            <div className="h-px bg-gray-600 mb-2 sm:mb-4 w-24 md:w-4/5"></div>
            <p className="text-sm sm:text-lg text-gray-400 mb-1">+91 7993319933</p>
            <p className="text-sm sm:text-lg text-gray-400">admin@carsbuddy.net</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-500 mt-8 text-xs sm:text-sm">
        Copyright © 2025 CarsBuddy. All Rights Reserved.
      </div>
    </footer>
  );
}
