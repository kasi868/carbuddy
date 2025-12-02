import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import heroBg from '../assets/contactbg1.jpg'; 
import sideimg from '../assets/hero/side.jpg';
import sideimg2 from '../assets/hero/hist.jpeg';
import { Link } from "react-router-dom";

const steps = [
  {
    step: '01.',
    title: 'Book Your Appointment',
    desc: `Choose the Cleaning service that best fits your needs and schedule an appointment at your convenience.
           You can book online, call us, or visit our location. We’ll confirm your booking and provide any necessary preparation details.`,
  },
  {
    step: '02.',
    title: 'We Detail Your Car',
    desc: `Our professional detailers will carefully clean, restore, and protect your vehicle using high-quality products and techniques.`,
  },
  {
    step: '03.',
    title: 'Enjoy the Shine',
    desc: `Once your car is detailed, you’ll experience a finish that looks as good as new. Enjoy the refreshed look and feel of your vehicle.`,
  },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

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

  const reviews = [
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
      text: "The attention to detail was mind-blowing. From the corner to corner, everything sparkles.",
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
  ];

  return (
    <div className="bg-black text-white">

      {/* Hero Section */}
      <div
        className="bg-cover bg-center min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] py-16 sm:py-20 px-4 sm:px-6 md:px-24"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-2">About Us</h1>
          <p className="text-md text-gray-400 mt-2">
            <span className="font-bold text-yellow-400">Home</span> / About Us
          </p>
        </div>
      </div>

      {/* Know Us More Section */}
      <section className="bg-black text-white py-16 sm:py-20 px-4 sm:px-6 md:px-20">
        <div className="grid grid-cols-12 gap-4 items-start">
          <div className="col-span-12 md:col-span-9">
            <h3 className="uppercase font-bold text-sm md:text-base text-gray-400 mb-3">
              Know Us More
            </h3>

            <motion.h2
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="font-bold mb-6 leading-tight"
            >
              <span className="text-2xl sm:text-3xl md:text-5xl">
                Enhancing Your <span className="text-yellow-400">Driving Experience</span> <br className="hidden md:block"/> 
                with Professional Car Cleaning &amp; Maintenance
              </span>
            </motion.h2>
          </div>

          <div className="col-span-12 md:col-span-3 flex md:justify-end mt-4 md:mt-14">
            <a
              href="/contact"
              className="inline-block w-full md:w-auto bg-yellow-400 text-black font-semibold px-5 py-2 sm:px-6 sm:py-3 md:px-6 md:py-3 rounded-full text-base md:text-lg shadow hover:bg-yellow-300 transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Side-by-side image and features */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center mt-12">
          <div>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed">
              Experience smoother, more enjoyable driving with expert car Cleaning and maintenance that keeps your vehicle clean, protected, and running at its best.
            </p>
            <br />
            {[
              {
                title: 'Driven by Passion, Defined by Quality',
                text: 'We treat every vehicle as our own, delivering a flawless clean and unmatched attention to detail for a showroom-worthy finish every time.',
              },
              {
                title: 'Restoring Your Car’s Beauty, Inside & Out',
                text: 'From deep interior cleaning to sparkling exteriors, we bring back the shine, freshness, and comfort you fell in love with when you first bought your car.',
              },
              {
                title: 'Your Car Deserves Premium Care – We Deliver It',
                text: 'With advanced cleaning techniques and eco-friendly products, we ensure your vehicle gets the best treatment for long-lasting cleanliness and protection.',
              },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-start">
                  <div className="text-lg font-bold bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded shadow mr-4">
                    {`0${index + 1}`}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg md:text-xl mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.text}</p>
                  </div>
                </div>
                {index < 2 && <hr className="my-6 border-gray-500" />}
              </div>
            ))}
          </div>
          <div>
            <img src={sideimg} alt="Car Cleaning" className="w-full h-auto object-cover rounded-xl shadow-xl" />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-[#1A1A1A] text-white px-4 sm:px-6 md:px-20 py-16 sm:py-20">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="flex flex-col justify-between h-full">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest text-base mb-4">
              Why Choose Us?
            </h3>

            <div className="mt-auto">
              <div ref={ref}>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-5xl sm:text-6xl md:text-8xl font-bold text-yellow-400"
                >
                  {count}%
                </motion.h1>
              </div>
              <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
                <span className="font-semibold text-white">
                  Many have felt the pleasure
                </span>{" "} of our service and many have entrusted their vehicles to us
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <motion.h2
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 text-white leading-tight"
            >
              Premium Car Cleaning, Precision Cleaning
              <br />
              <span className="text-yellow-400">Care for Your Car</span>
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="col-span-1 text-white text-xl md:text-2xl font-semibold leading-snug">
                Transforming <br /> Cars into <br /> Masterpieces
              </div>
              <p className="col-span-3 text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed">
                Experience world-class car Cleaning that blends precision, passion, and premium care. Our expert team uses advanced techniques and high-quality products to protect, enhance, and transform your vehicle’s appearance — inside and out. From deep cleaning to flawless finishing, we deliver unmatched results that keep your car looking showroom fresh.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {[
                { num: "01", title: "Everyday Reliability", desc: "Consistent care keeps your car always ready to impress." },
                { num: "02", title: "Eco-Friendly Premium Products", desc: "We use only top-tier, eco-safe Cleaning products that are gentle on your car’s surface yet tough on dirt." },
                { num: "03", title: "Doorstep Convenience", desc: "We come to you, so you never have to go looking for a wash." },
                { num: "04", title: "100% Customer Satisfaction", desc: "Our personalized service and quality guarantee make every visit worth it." },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-yellow-400 font-bold text-base md:text-lg mb-2">{item.num}</div>
                  <hr className="border-gray-600 mb-4" />
                  <h4 className="font-semibold text-white text-lg md:text-xl mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>



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

      {/* How It Works Section */}
      <section className="bg-[#1A1A1A] text-white py-16 sm:py-20 px-4 sm:px-6 md:px-20">
        <div className="grid grid-cols-12 gap-4 items-start">
          <div className="col-span-12 md:col-span-9">
            <h3 className="uppercase font-bold text-sm md:text-base tracking-widest text-gray-400 mb-3">
              How It Works
            </h3>
            <motion.h2
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 text-white leading-tight"
            >
              Obtain Your Car's History <br />
              <span className="text-white-400">In Just Three Easy Steps.</span>
            </motion.h2>
            <a
              href="/contact"
              className="inline-block bg-yellow-400 text-black font-semibold text-base sm:text-lg px-5 py-2 sm:px-6 sm:py-3 rounded-full shadow hover:bg-yellow-300 transition duration-300"
            >
              Let's Get In Touch
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div>
            {steps.map((item, index) => (
              <div key={index}>
                <div
                  className="flex items-start cursor-pointer group"
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="text-lg font-bold text-gray-400 w-10 h-10 flex items-center justify-center rounded shadow mr-4">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-100 text-lg md:text-xl mb-2 group-hover:text-yellow-400">
                      {item.title}
                    </h4>
                    {activeIndex === index && (
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
                    )}
                  </div>
                </div>
                {index < steps.length - 1 && <hr className="my-4 border-gray-600" />}
              </div>
            ))}
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <img
              src={sideimg2}
              alt="Car Cleaning"
              className="w-full h-auto md:max-h-[500px] object-cover rounded-xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute bottom-4 left-4 bg-black bg-opacity-80 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg max-w-[85%]"
            >
              <p className="text-sm sm:text-base leading-snug font-medium">
                “Your car deserves more than a quick wash. Our Cleaning services are designed to go the extra mile, restoring its beauty and protecting it from the elements.”
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-black via-zinc-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-4 sm:px-6 py-10 sm:py-12 shadow-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-white-400"
          >
            Your Car's Best Look Is Just One Detail Away
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90"
          >
            Book Your Cleaning Today! And Get <span className="text-yellow-400 font-bold">20% Cut Off</span>
          </motion.p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-yellow-400 text-black font-bold py-3 px-10 rounded-full text-lg transition duration-300 shadow-lg hover:bg-yellow-300"
          >
            <Link to="/Contact"> Booking Now </Link>
          </motion.button>
        </div>
      </section>

    </div>
  );
}
