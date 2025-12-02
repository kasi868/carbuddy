import React from "react";

import { SlArrowRightCircle } from "react-icons/sl";
import Imageone from "../assets/cards1.jpg";
import Imagetwo from "../assets/card1.jpg";
// import Imagethree from "../assets/service_3.jpg";
import Imagefour from "../assets/wax.jpg";
// import Imagefive from "../assets/service_5.jpg";
// import Imagesix from "../assets/services-single.jpg";


function Cards() {
     const cardsdata=[
          {
               id:"01.",
               img:Imageone,
               discriptionone:"Exterior Cleaning",
              //  discriptiontwo:"Read More",
               discriptiontthree:"Restore your car’s showroom shine with our premium exterior Cleaning that cleans, polishes, and protects every surface."

          },
           {
               id:"02.",
               img:Imagetwo,
               discriptionone:"Interior Cleaning",
              //  discriptiontwo:"Read More",
               discriptiontthree:"Thorough interior cleaning including vacuuming, dust removal, and wiping surfaces to keep your car fresh and spotless."

          },
          //   {
          //      id:"03.",
          //      img:Imagethree,
          //      discriptionone:"Paint Correction",
          //      discriptiontwo:"Read More",
          //      discriptiontthree:"Deep cleaning of seats, carpets, dashboard, and all interior surfaces for a fresh, spotless cabin"

          // },
            {
               id:"03.",
               img:Imagefour,
               discriptionone:"Wax Coating",
              //  discriptiontwo:"Read More",
               discriptiontthree:"Thorough interior cleaning including vacuuming, dust removal, and wiping surfaces to keep your car fresh and spotless."

          },
          //   {
          //      id:"05.",
          //      img:Imagefive,
          //      discriptionone:"Engine Bay Cleaning",
          //      discriptiontwo:"Read More",
          //      discriptiontthree:"Safe and detailed cleaning of the engine bay to improve appearance and longevity."

          // },
          //   {
          //      id:"06.",
          //      img:Imagesix,
          //      discriptionone:"Headlight Restoration",
          //      discriptiontwo:"Read More",
          //      discriptiontthree:"Removing oxidation and yellowing to restore clarity and improve night visibility."

          // },

  
     ]
  return (
<div className="animate-fadeLeft grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20 xl:ml-14 gap-5 p-5" >
  {cardsdata.map((card) => (
    <div key={card.id} className="shadow-lg md:w-96 md:h-96 rounded-md mt-10 relative overflow-hidden group bg-black " >
      
      {/* Image */}
      <img
        src={card.img}
        alt="Interior Cleaning"
        className="w-full h-96 bg-contain  bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
      />
      {/* Yellow Number */}
      <div className="absolute top-4 left-4 text-yellow-400 text-2xl font-bold">
        {card.id}
      </div>

      {/* Bottom Overlay */}
      <div className="absolute bottom-0 left-0 right-0 
                      bg-black/50 p-5 rounded-t-xl 
                      transition-all duration-500 ease-in-out">
        
        {/* Title always visible */}
        <h5 className="text-yellow-400 font-bold text-lg">
          {card.discriptionone}
        </h5>

        {/* Hidden content - show on hover */}
        <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out">
          
          <div className="flex flex-row justify-start items-center gap-2">
            <a
              href="#s"
              className="inline-flex items-center gap-2 text-white font-semibold font-medium mt-2 mb-2 hover:underline"
            >
              {card.discriptiontwo}
            </a>
            <SlArrowRightCircle size={18} style={{ color: "white" }} />
          </div>

          <p className="text-gray-300 text-base font-semibold">
            {card.discriptiontthree}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>

  );
}

export default Cards;
