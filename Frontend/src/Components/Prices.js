// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion"; 
// import Blog from "../assets/new2.jpg";
// import Blogtwo from "../assets/new1.jpg";
// import Blogthree from "../assets/new3.jpg";

// function Prices() {
//   const navigate = useNavigate();

//   const handleChoosePlan = (plan) => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");

//     let planRoute = "";
//     if (plan === "Gold") planRoute = "/CheckoutBasic";
//     else if (plan === "Platinum") planRoute = "/CheckoutPremium";
//     else if (plan === "Diamond") planRoute = "/CheckoutUltimate";

//     if (isLoggedIn === "true") {
//       navigate(planRoute);
//     } else {
//       localStorage.setItem("redirectAfterLogin", planRoute);
//       navigate("/login");
//     }
//   };

//   const Carwash = [
//     {
//       id: 1,
//       wash: "Gold",
//       img: Blog,
//       // price: "₹299",
//       discription: [
//         "Exterior cleaning using dry/wet microfiber cloths",
//         "Safe for paint, glass, and trims",
//         "Ideal for basic maintenance",
//       ],
//     },
//     {
//       id: 2,
//       wash: "Platinum",
//       img: Blogtwo,
//       // price: "₹499",
//       discription: [
//         "Everything in Gold Plan Applies",
//         "Monthly twice interior cleanings",
//         "Keeps your car looking fresh all day",
//         "Perfect for daily drivers",
//       ],
//     },
//     {
//       id: 3,
//       wash: "Diamond",
//       img: Blogthree,
//       // price: "₹999",
//       discription: [
//         "Everything in Platinum Plan Applies",
//         "Monthly once wax coating for shine",
//         "Delivers a sleek, shiny finish that enhances your car’s appearance",
//         "Ideal for premium and luxury cars",
//       ],
//     },
//   ];

//   return (
//     <div className="bg-black w-full">
//       <div className="flex flex-col text-white gap-10 p-10">
//         {/* Header */}
//         <div className="flex flex-col justify-center items-center gap-10">
//           <div className="text-yellow-400 font-bold text-4xl">PRICING</div>
//           <div className="font-semibold text-2xl text-gray-400 text-center">
//             Keep your car looking brand new with our professional car wash packages.
//           </div>
//         </div>

//         {/* Animated Cards */}
//         <div className="grid gap-5 md:grid-cols-1 md:ml-32 lg:ml-14 lg:grid-cols-2 lg:gap-5 xl:grid-cols-3 md:justify-center">
//           {Carwash.map((cars, index) => (
//             <motion.div
//               key={cars.id}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               whileHover={{
//                 scale: 1.05,
//                 y: -10,
//                 boxShadow: "0px 8px 25px rgba(255, 215, 0, 0.4)",
//               }}
//               transition={{
//                 duration: 0.3,
//                 delay: index * 0.2,
//                 ease: "easeOut",
//               }}
//               className="md:w-96 md:h-96 card shadow-lg rounded bg-gray-800 bg-cover bg-center relative cursor-pointer"
//               style={{ backgroundImage: `url(${cars.img})` }}
//             >
//               <div className="absolute inset-0 bg-black opacity-50 rounded"></div>

//               <div className="flex flex-col text-white p-5 justify-center items-center text-center gap-5 mt-6 relative z-10">
//                 <div className="text-xl md:text-3xl font-bold">{cars.wash}</div>
//                 <div className="text-base md:text-2xl text-yellow-400 font-bold">
//                   {cars.price}
//                 </div>
//                 <ul className="text-left text-base md:text-lg font-semibold">
//                   {cars.discription.map((item, idx) => (
//                     <li key={idx}>{item}</li>
//                   ))}
//                 </ul>

//                 <div className="w-full">
//                   <button
//                     onClick={() => handleChoosePlan(cars.wash)}
//                     className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:bg-yellow-300 transition-all"
//                   >
//                     {`Choose ${cars.wash.split(" ")[0]} Plan`}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Prices;

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import Blog from "../assets/new2.jpg";
import Blogtwo from "../assets/new1.jpg";
import Blogthree from "../assets/new3.jpg";

function Prices() {
  const navigate = useNavigate();

  const handleChoosePlan = (plan) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    let planRoute = "";
    if (plan === "Gold") planRoute = "/CheckoutBasic";
    else if (plan === "Platinum") planRoute = "/CheckoutPremium";
    else if (plan === "Diamond") planRoute = "/CheckoutUltimate";

    if (isLoggedIn === "true") {
      navigate(planRoute);
    } else {
      localStorage.setItem("redirectAfterLogin", planRoute);
      navigate("/login");
    }
  };

  const Carwash = [
    {
      id: 1,
      wash: "Daily Car Care",
      img: Blog,
      // price: "₹299",
      discription: [
        "Exterior cleaning using dry/wet microfiber cloths",
        "Safe for paint, glass, and trims",
        "Ideal for basic maintenance",
      ],
    },
    {
      id: 2,
      wash: "Interior cleaning",
      img: Blogtwo,
      // price: "₹499",
      discription: [
     
  "Monthly twice interior cleanings",
  "Vacuum cleaning included",
  "Keeps your car looking fresh all day",
  "Perfect for daily drivers",


      ],
    },
    {
      id: 3,
      wash: "Wax coating",
      img: Blogthree,
      // price: "₹999",
      discription:[
  "Monthly once wax coating for shine",
  "Delivers a sleek, shiny finish that enhances your car’s appearance",
  "Brand new look guaranteed",
  "Sun protection for car paint and interiors",
  "Ideal for premium and luxury cars",
]

    },
  ];

  return (
    <div className="bg-black w-full">
      <div className="flex flex-col text-white gap-10 p-10">
        {/* Header */}
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="text-yellow-400 font-bold text-4xl">PRICING</div>
          <div className="font-semibold text-2xl text-gray-400 text-center">
            Keep your car looking brand new with our professional car wash packages.
          </div>
        </div>

        {/* Animated Cards */}
        <div className="grid gap-5 md:grid-cols-1 md:ml-32 lg:ml-14 lg:grid-cols-2 lg:gap-5 xl:grid-cols-3 md:justify-center">
          {Carwash.map((cars, index) => (
            <motion.div
              key={cars.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: "0px 8px 25px rgba(255, 215, 0, 0.4)",
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              className="md:w-96 md:h-96 card shadow-lg rounded bg-gray-800 bg-cover bg-center relative cursor-pointer"
              style={{ backgroundImage: `url(${cars.img})` }}
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded"></div>

              <div className="flex flex-col text-white p-5 justify-center items-center text-center gap-5 mt-6 relative z-10">
                <div className="text-xl text-yellow-400 md:text-3xl font-bold">{cars.wash}</div>
                <div className="text-base md:text-2xl text-yellow-400 font-bold">
                  {cars.price}
                </div>
                <ul className="text-left text-base md:text-lg font-semibold">
                  {cars.discription.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                {/* <div className="w-full">
                  <button
                    onClick={() => handleChoosePlan(cars.wash)}
                    className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:bg-yellow-300 transition-all"
                  >
                    {Choose ${cars.wash.split(" ")[0]} Plan}
                  </button>
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Prices;
