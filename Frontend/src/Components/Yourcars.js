import React from 'react'
import Background from "../assets/commpagesbg.jpg";
import { Link } from 'react-router-dom';

function Yourcars() {
  return (
    <div
      className="h-96 bg-cover bg-no-repeat bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="text-center flex flex-col justify-center items-center gap-5">
        <h1 className="text-xl md:text-3xl xl:text-4xl lg:text-4xl font-bold text-white drop-shadow-lg">
          Your Car’s Best Look Is Just One Detail Away
        </h1>
        <div className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
          Book Your Cleaning Today! And <p className='text-yellow-500'>Get 20% Cut Off</p>
        </div>

        <Link
          to="/prices"
          className="bg-yellow-400 text-black text-base md:text-xl md:w-44 px-2 py-2 font-semibold rounded-full text-center"
          onClick={() => window.scrollTo(0, 0)} // scrolls to top
        >
          Booking Now
        </Link>
      </div>
    </div>
  )
}

export default Yourcars
