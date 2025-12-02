import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCheck } from "react-icons/fa";
import { FaUser, FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import PopupForm from "./PopupForm";
import { useNavigate } from "react-router-dom";

import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import card3 from "../assets/card3.jpg";
import image from "../assets/image.png";
import bg from "../assets/bg.jpg";

function Hero() {
  // const ref = useRef(null);
  const { ref, inView } = useInView({ triggerOnce: true });
  const [count, setCount] = useState(0); // You can animate this if needed

  useEffect(() => {
    if (inView && count < 85) {
      let start = 0;
      const end = 85;
      const duration = 1500;
      const increment = end / (duration / 20);
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(counter);
        }
        setCount(Math.floor(start));
      }, 20);
    }
  }, [inView]);
  return (
    <div className=" w-full overflow-x-hidden bg-[#070707] text-white font-sans">
      <PopupForm delay={5000} />

      <section
        className="relative bg-cover bg-center min-h-[90vh]"
        style={{ backgroundImage: "url('/Assests/Hero/hero_slider_bg_1.png')" }}
      >
        <div className="absolute inset-0 bg-opacity-70"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-white">
          <div className="h-20 py-24 px-6"></div>
          {/* Heading and Button */}
          <motion.h1
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-extrabold leading-tight mb-8 max-w-3xl"
          >
            Your Car’s Best Buddy Every Day, Without Fail
          </motion.h1>
          <Link to="/login">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-lg px-6 py-3 rounded-full mb-14 transition">
              Join the Buddy Family
            </button>{" "}
          </Link>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 bg-opacity-90 p-6 rounded-2xl shadow-lg">
              <h3 className="text-white text-xl font-bold mb-2">
                Smart Car Cleaning
              </h3>
              <p className="text-gray-300">
                We clean your car with the best methods to make it look new and stylish again.
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-90 p-6 rounded-2xl shadow-lg">
              <h3 className="text-white text-xl font-bold mb-2">
                Safe & Sustainable Products
              </h3>
              <p className="text-gray-300">
                Enjoy a brilliant finish without harming the environment — we
                use high-quality, eco-safe solutions for lasting beauty.
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-90 p-6 rounded-2xl shadow-lg">
              <h3 className="text-white text-xl font-bold mb-2">
                100% Customer Satisfaction
              </h3>
              <p className="text-gray-300">
                We promise a perfect finish every time, ensuring your car feels,
                looks, and smells like it just rolled off the lo
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className=" relative bg-black text-white py-20 px-6 md:px-20 overflow-hidden">
        {/* Responsive Background Image */}

        <div
          className="absolute inset-0 bg-no-repeat bg-center mt-[25rem]  bg-cover brightness-100 pointer-events-none z-0 bg-responsive-position"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "contain",
            backgroundPosition: " top bottom ",
          }}
        />
        <style>
          {`
      @media (min-width: 768px) {
        .bg-responsive-position {
          background-position: bottom center !important;
        }
      }
    `}
        </style>

        <div className="relative z-10 max-w-screen-xl mx-auto">
          {/* About Section */}
          <div className="grid md:grid-cols-[150px_1fr] gap-8 items-start mb-24">
            <div>
              <h5 className="text-sm uppercase text-gray-400 tracking-wider mt-2">
                About Us
              </h5>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Dedicated to delivering premium car cleaning that{" "}
                <span className="text-yellow-400">
                  keeps your vehicle looking its absolute best, with a flawless
                  showroom shine every time.
                </span>
              </h2>
            </motion.div>
            <div className="h-px bg-gray-600 w-32 mb-6 ml-44"></div>
            <p className="text-lg text-gray-300 leading-relaxed text-left max-w-4xl mb-15 ml-32">
              Our dedicated team arrives at your community on a fixed schedule,
              ensuring your car is always clean and presentable. We provide
              daily exterior cleaning to keep away dust and dirt, a regular
              refresh of the interiors to keep them comfortable and hygienic,
              and for our premium members, a protective coating that adds an
              extra layer of shine and safeguards your car’s paint.
            </p>
          </div>
          <div className="bg-black text-center mb-28">
            <h4 className="text-gray-400 uppercase tracking-wider text-sm mb-2">
              Our Top Solution
            </h4>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Expert Car Cleaning for a Pristine
              <br />
              <span className="text-white">Head-Turning Look </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Restore your vehicle’s beauty with our premium Cleaning services,
              crafted to protect, refresh, and elevate its look. We focus on
              every detail to deliver a sleek, spotless finish that turns heads
              everywhere you go.
            </p>
          </div>

          {/* Card Grid Section */}
          <div className=" max-w-screen-xl mx-auto mt-[13rem] px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Showroom-Ready Exterior",
                  desc: "Bring back the flawless shine with expert polish and premium protection.",
                  animation: { x: -100, opacity: 0 },
                  classes: "lg:col-start-1 lg:row-start-1",
                },
                {
                  title: "Luxury Interior Care",
                  desc: "Enjoy a fresh, spotless cabin that feels brand new",
                  animation: { y: 100, opacity: 0 },
                  classes: "lg:col-start-2 lg:row-start-2",
                },
                {
                  title: "Premium Protective Finish",
                  desc: "A smooth, glossy layer that not only enhances your car’s shine.",
                  animation: { y: 100, opacity: 0 },
                  classes: "lg:col-start-3 lg:row-start-2",
                },
                {
                  title: "Wax coating",
                  desc: "Enhances your car’s shine while adding a protective layer against dust and water.",
                  animation: { x: 100, opacity: 0 },
                  classes: "lg:col-start-4 lg:row-start-1",
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={card.animation}
                  whileInView={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={`relative bg-[#1a1a1a] p-6 rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105 ${card.classes}`}
                >
                  {/* Yellow arrow circle */}
                  <div className="absolute -top-5 left-5 w-10 h-10 bg-yellow-400 text-black rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-lg font-bold">→</span>
                  </div>

                  {/* Card content */}
                  <h3 className="text-white text-lg font-semibold mb-2">
                    {card.title}
                  </h3>
                  <p className="text-lg text-gray-300 mb-4">{card.desc}</p>
                  <a href="#" className="text-white font-semi-bold underline">
                    {/* Read More */}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="bg-black text-white py-24 px-6 md:px-20 overflow-hidden">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h3 className="text-gray-400 font-bold uppercase tracking-widest text-base xl:text-lg mb-4">
            Customer Reviews
          </h3>
          <h2 className="text-3xl sm:text-5xl xl:text-6xl font-bold leading-tight">
            Customer <span className="text-yellow-400">Experiences</span> <br />
            That Speak For Themselves
          </h2>
        </motion.div>

        {/* Horizontal Infinite Scroll */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex flex-nowrap gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40, // Adjust for speed
            }}
          >
            {/* Duplicate the reviews twice in one line */}
            {Array(2)
              .fill([
                {
                  text: "Unbelievable transformation! My car shines like it just rolled off the showroom floor. The precision and care were outstanding. I’m beyond impressed!",
                  name: "Mani Kumar",
                  role: "Auto Dealer",
                },
                {
                  text: "Simply outstanding. My vintage beauty has never looked better. Every inch was polished to perfection!",
                  name: "Raj Paul",
                  role: "Vintage Car Owner",
                },
                {
                  text: "This Cleaning service is on another level. My car feels brand new inside and out — I can’t stop admiring it.",
                  name: "Poojitha M",
                  role: "Car Owner",
                },
                {
                  text: "I love stepping out in the morning to find my car sparkling, without having lifted a finger.",
                  name: "Sowmya",
                  role: "Car Owner",
                },
                {
                  text: "Remarkable service! My vehicle hasn’t looked this stunning in years. I’ll be booking regular appointments!",
                  name: "Hafsha Jasmine",
                  role: "Auto Dealer",
                },
                {
                  text: "From the warm welcome to the final polish, everything was flawless. My car is spotless and smells fresh.",
                  name: "Pratap",
                  role: "Car Collector",
                },
              ])
              .flat()
              .map((review, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 min-w-[320px] max-w-[320px] p-8 rounded-md shadow-lg flex-shrink-0"
                >
                  <p className="mb-6 text-gray-200 leading-relaxed text-sm">
                    {review.text}
                  </p>
                  <div>
                    <h4 className="font-bold text-lg text-yellow-400">
                      {review.name}
                    </h4>
                    <p className="text-xs text-gray-400">{review.role}</p>
                  </div>
                </div>
              ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#1A1A1A] text-white px-6 md:px-15 py-20">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Left side: 90% block */}
          <div className="flex flex-col justify-between h-full">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest text-base xl:text-lg mb-4">
              Why Choose Us?
            </h3>

            <div className="mt-auto">
              <div ref={ref}>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-7xl md:text-8xl font-bold text-yellow-400"
                >
                  {count}%
                </motion.h1>
              </div>
              <p className="mt-6 text-base md:text-lg text-gray-300 font-medium leading-relaxed">
                <span className="font-semibold text-white">
                  Many have felt the pleasure
                </span>{" "}
                of our service and many have entrusted their vehicles to us
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <motion.h2
              initial={{ opacity: 0, x: -100 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight"
            >
              Premium Car Cleaning, Precision Cleaning
              <br />
              <span className="text-yellow-400">Care for Your Car</span>
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-1 text-left text-white text-2xl md:text-3xl font-semibold leading-snug">
                Transforming <br /> Cars into <br /> Masterpieces
              </div>
              <p className="col-span-3 text-left text-gray-400 text-base md:text-xl leading-relaxed">
                Experience world-class car Cleaning that blends precision,
                passion, and premium care. Our expert team uses advanced
                techniques and high-quality products to protect, enhance, and
                transform your vehicle’s appearance — inside and out. From deep
                cleaning to flawless finishing, we deliver unmatched results
                that keep your car looking showroom fresh.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
              {[
                {
                  num: "01",
                  title: "Everyday Reliability",
                  desc: "Consistent care keeps your car always ready to impress.",
                },
                {
                  num: "02",
                  title: "Eco-Friendly Premium Products",
                  desc: "We use only top-tier, eco-safe Cleaning products that are gentle on your car’s surface yet tough on dirt, ensuring a lasting shine without harming the environment.",
                },
                {
                  num: "03",
                  title: "Hassle-Free Plans",
                  desc: "Simple, straightforward subscriptions with no extra fuss.",
                },
                {
                  num: "04",
                  title: "100% Customer Satisfaction",
                  desc: "We’re committed to delivering results you’ll love. Our personalized service and quality guarantee make every visit worth it.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-yellow-400 font-bold text-base md:text-lg mb-2">
                    {item.num}
                  </div>
                  <hr className="border-gray-600 mb-4" />
                  <h4 className="font-semibold text-white text-lg md:text-xl mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
          {/* <div className="text-center mb-16">
            <motion.p
              className="text-sm text-gray-400 uppercase tracking-wider mb-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Pricing Plan
            </motion.p>

            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Choose the Right Cleaning Service for a Fresh, Flawless Ride
            </motion.h2>

            <motion.p
              className="text-gray-400 text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              Find the ideal car cleaning package designed to suit your
              vehicle’s needs and condition. From quick exterior washes to full
              deep-clean treatments, our packages ensure your car stays
              spotless, fresh, and well-maintained — inside and out.
            </motion.p>
          </div> */}

          {/* <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Gold",
                desc: "Designed for regular maintenance, keeping your car clean and fresh.",
                features: [
                  "Exterior cleaning using dry/wet microfiber cloths",

                  "Safe for paint, glass",
                  "Effective cleaning to maintain a fresh, polished look all the time.",

                  "Ideal for basic maintenance",
                ],
              },
              {
                title: "Platinum",
                
                desc: "A deep clean inside and out, perfect for cars needing extra attention.",
                features: [
                  "Everything in Gold Plan Applies",

                  "Montly Twice interior cleanings",

                  "Your car’s cabin stays inviting, comfortable, and dust-free.",

                  "Ideal for vehicles in daily use",
                ],
              },
              {
                title: "Diamond",
                
                desc: "Perfect clean like a new car, service for cars needing more extra attention.",
                features: [
                  "Everything in Platinum Plan Applies",

                  "Montly once wax coatings for protection & shine",

                  "Enhances your car’s shine while protecting it from daily wear and tear.",

                  "Ideal for premium and luxury cars",
                ],
              },
            ].map((plan, index) => {
              const initialMotion =
                index === 0
                  ? { opacity: 0, x: -60 }
                  : index === 1
                  ? { opacity: 0, y: 60 }
                  : { opacity: 0, x: 60 };

              return (
                <motion.div
                  key={plan.title}
                  initial={initialMotion}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-[#1A1A1A] p-6 rounded-2xl shadow-md"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {plan.title}
                    </h3>
                  
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-1">Start With</p>
                    <h4 className="text-4xl font-bold text-yellow-400">
                      {plan.price}
                    </h4>
                  </div>

                  <p className="text-sm text-gray-400 mb-6">{plan.desc}</p>

                  {plan.title === "Gold" && (
                    <Link to="/Prices" className="w-full block">
                      <button
                        onClick={() => window.scrollTo(0, 0)}
                        className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:bg-yellow-300 transition-all"
                      >
                        Choose Plan
                      </button>
                    </Link>
                  )}

                  {plan.title === "Platinum" && (
                    <Link to="/Prices" className="w-full block">
                      <button
                        onClick={() => window.scrollTo(0, 0)}
                        className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:bg-yellow-300 transition-all"
                      >
                        Choose Plan
                      </button>
                    </Link>
                  )}

                  {plan.title === "Diamond" && (
                    <Link to="/Prices" className="w-full block">
                      <button
                        onClick={() => window.scrollTo(0, 0)}
                        className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:bg-yellow-300 transition-all"
                      >
                        Choose Plan
                      </button>
                    </Link>
                  )}

                  <div className="mt-8 bg-[#222] bg-opacity-60 p-5 rounded-xl border border-gray-700">
                    <h5 className="text-md text-white font-semibold mb-4">
                      Feature :
                    </h5>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start text-sm text-gray-300"
                        >
                          <FaCheck className="text-yellow-400 mr-2 mt-1" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div> */}
      

      {/* Hero Section */}
      <section className="relative w-full h-80 flex items-center justify-center bg-black overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-60 z-0"
    style={{
      backgroundImage: `url(${bg})`,
    }}
  />

  {/* Content */}
  <div className="relative z-10 text-center px-4">
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6"
    >
      From Dusty to Dazzling – We Make Cars Shine
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="text-gray-200 text-lg sm:text-xl mb-8"
    >
      Book Your Cleaning Today! And Get{" "}
      <span className="text-yellow-400 font-semibold">20% Cut Off</span>
    </motion.p>

    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to="/Prices"
        onClick={() => window.scrollTo(0, 0)}
        className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full text-lg shadow-md hover:bg-yellow-300 transition-all duration-300 inline-block"
      >
        Booking Now
      </Link>
    </motion.div>
  </div>
</section>


      <section className="bg-black text-white py-16 px-4 md:px-10">
        <div className="text-center mb-12">
          <motion.p
            className="text-gray-400 text-sm tracking-widest uppercase"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Blogs & Articles
          </motion.p>

          <motion.h2
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Expert Tips & Insights for Car Enthusiasts
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              src: card1,
              title: "Deep Interior Car Cleaning Tips",
              category: "Cleaning",
              description:
                "Discover expert tips to clean and refresh your car’s interior. From seats to carpets, ensure every corner looks and smells brand new with our proven techniques.",
            },
            {
              src: card2,
              title: "Pro Car Care & Maintenance Essentials",
              category: "Maintenance",
              description:
                "Maximize your car’s lifespan with these must-know maintenance tips. Learn about oil changes, brake checks, and seasonal upkeep to keep your ride in top condition.",
            },
            {
              src: card3,
              title: "Protect & Preserve Your Car’s Showroom Shine",
              category: "Protection",
              description:
                "Safeguard your car’s paint from UV rays, dust, and scratches. Our protection methods help maintain a glossy, showroom-like finish all year round.",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="group bg-[#111] rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="overflow-hidden">
                <img
                  src={card.src}
                  alt={card.title}
                  className="w-full h-74 object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-yellow-400 cursor-pointer">
                  {card.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1">
                    <FaUser className="text-yellow-400" /> Veera Pratap
                  </span>
                  <span className="flex items-center gap-1">
                    <FaFolder className="text-yellow-400" /> {card.category}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Hero;
