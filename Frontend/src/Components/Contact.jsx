import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import heroBg from '../assets/contactbg1.jpg';
import { useAddLeadMutation } from "../services/apiService";
import { toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [addLead] = useAddLeadMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLead(formData).unwrap();
      toast.success("Your message has been sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast.error("Failed to send your message");
    }
  };

  return (
    <div className=" w-full overflow-x-hidden bg-[#070707] text-white font-sans">

      {/* Hero Section */}
      <section className="py-24 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="text-center px-4 sm:px-6">
          <h1 className="text-3xl sm:text-5xl font-bold">Contact Us</h1>
          <p className="text-gray-300 mt-4 text-base sm:text-lg">Feel free to reach out to us anytime</p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 md:px-10 bg-[#0b0b0b] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {[{
            icon: <FaMapMarkerAlt className="text-3xl mx-auto text-yellow-400" />,
            title: "Location",
            info: "301 SV land mark bachupally hyderabad 500090",
            anim: { initial: { x: -100, opacity: 0 }, whileInView: { x: 0, opacity: 1 } }
          },{
            icon: <FaPhoneAlt className="text-3xl mx-auto text-yellow-400" />,
            title: "Call Us Anytime",
            info: "+91 7993319933",
            anim: { initial: { y: 100, opacity: 0 }, whileInView: { y: 0, opacity: 1 } }
          },{
            icon: <FaEnvelope className="text-3xl mx-auto text-yellow-400" />,
            title: "Send Us Email",
            info: "admin@carsbuddy.net",
            anim: { initial: { x: 100, opacity: 0 }, whileInView: { x: 0, opacity: 1 } }
          }].map((item, index) => (
            <motion.div
              key={index}
              initial={item.anim.initial}
              whileInView={item.anim.whileInView}
              transition={{ duration: 1 }}
              className="bg-[#1e1e1e] p-6 sm:p-8 rounded-lg text-center hover:shadow-xl transition"
            >
              {item.icon}
              <h3 className="text-lg sm:text-xl mt-4 mb-2 font-semibold">{item.title}</h3>
              <p className="text-yellow-400">{item.info}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-[#111111] py-12 md:py-20 px-4 sm:px-6 md:px-10 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
          
          {/* Right: Text Info */}
          <div className="order-2 md:order-none">
            <motion.h2
              className="text-2xl sm:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <span className="text-yellow-400">Talk to Us</span> – Because Your Car Deserves the Best!
            </motion.h2>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              Have a question about our car cleaning services? Need expert advice on how to keep your vehicle looking its best?
              We’re here to assist you! Whether you want to book an appointment, get a quote, or simply learn more about our
              services, don’t hesitate to reach out.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold mb-2">Why Contact Us?</h3>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              Our expert car care keeps your vehicle spotless, gleaming, and fully protected, boosting both its appearance and performance.
            </p>

            <ul className="space-y-2 mb-6">
              {["Professional Cleaning","Experienced Team","Easy & Fast Booking","Customer First"].map((item,index)=>(
                <li key={index} className="flex items-center text-sm sm:text-base">
                  <FaCheck className="text-yellow-400 w-4 h-4 mr-2" /> {item}
                </li>
              ))}
            </ul>

            <div>
              <h4 className="font-semibold mb-2 flex gap-3">Follow Our Social Media :</h4>
              <div className="flex gap-3 flex-wrap">
                {[
                  { icon: <FaFacebookF />, link: "https://www.facebook.com/" },
                  { icon: <FaInstagram />, link: "https://www.instagram.com/" },
                  { icon: <FaXTwitter />, link: "https://twitter.com/" },
                  { icon: <FaWhatsapp />, link: "https://wa.me/919876543210" },
                ].map((social,index)=>(
                  <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1e1e1e] rounded flex items-center justify-center border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Left: Contact Form */}
          <form onSubmit={handleSubmit} className="order-1 md:order-none space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="w-full p-3 sm:p-4 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email" className="w-full p-3 sm:p-4 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone" className="w-full p-3 sm:p-4 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Location" className="w-full p-3 sm:p-4 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
            </div>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="6" placeholder="Your message" className="w-full p-3 sm:p-4 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400" required></textarea>
            <button type="submit" className="w-full bg-yellow-400 text-black py-3 sm:py-4 rounded-full font-semibold hover:bg-yellow-300 transition">Submit Now</button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-64 sm:h-96 mt-8">
        <iframe
          className="w-full h-full"
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3130.8242999996796!2d78.35308207420864!3d17.529173383382442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8ddcb8044ab3%3A0xd490b22fe8e6e991!2sSV%20Landmark%20Apartment!5e1!3m2!1sen!2sin!4v1757449950333!5m2!1sen!2sin"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </section>
    </div>
  );
}

export default Contact;
