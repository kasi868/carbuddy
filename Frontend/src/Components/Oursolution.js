import React from "react";

import Cards from "./Cards";
function Oursolution() {
  return (
    <div className="card shadow-lg w-full bg-black ">
      <div className="flex font-semibold flex-col text-white justify-center items-center text-center gap-8 p-5">
        <div className="text-gray-400 text-2xl mt-10">OUR SOLUTIONS</div>
        <div className="font-semibold md:text-5xl text-yellow-400">
          Comprehensive Car Cleaning Solutions for a Flawless Finish
        </div>
        <div className="text-gray-400 md:text-xl md:mb-20">
          Drive with confidence and style through expert car care solutions that
          bring out the best in your vehicle’s appearance and condition.
        </div>
      </div>
      <Cards/>
    </div>
  );
}

export default Oursolution;
