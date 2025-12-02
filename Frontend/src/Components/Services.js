import React from "react";

import Background from "../assets/serv.png";

function Services() {
  return (
    <div
      class="h-96 bg-cover md:bg-cover bg-no-repeat bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div class="text-center">
        <h1 class="text-4xl md:text-7xl md:mb-20 font-bold text-yellow-400 drop-shadow-lg animate-fadeOutRight">
          Our Services
        </h1>
      </div>
    </div>
  );
}

export default Services;
