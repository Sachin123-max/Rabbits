import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import contactImage from "../assets/login.webp";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* LEFT - FORM */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex items-center justify-center p-6"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-2">Contact Us</h2>
          <p className="text-center text-gray-300 mb-6">
            We’d love to hear from you 🚀
          </p>

          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
          <Input
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <div className="mb-4">
            <label className="text-sm">Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your message..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-lg font-semibold"
          >
            Send Message
          </motion.button>

          <p className="text-center mt-4 text-sm text-gray-300">
            Back to{" "}
            <Link to="/" className="text-blue-400 hover:underline">
              Home
            </Link>
          </p>
        </form>
      </motion.div>

      {/* RIGHT - IMAGE + INFO */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex w-1/2 relative"
      >
        <img
          src={contactImage}
          alt="contact"
          className="w-[85%] h-[85%] object-cover opacity-60 rounded-2xl mx-auto my-auto"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-10">
          <h3 className="text-4xl font-bold mb-8">Get in Touch</h3>

          <Info icon={<HiOutlinePhone />} text="0123-456-789" />
          <Info icon={<HiOutlineMail />} text="support@rabbit.com" />
          <Info icon={<HiOutlineLocationMarker />} text="New York, USA" />
        </div>
      </motion.div>
    </div>
  );
};

/* INPUT COMPONENT */
const Input = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="text-sm">{label}</label>
    <input
      {...props}
      className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder={`Enter ${label}`}
    />
  </div>
);

/* INFO ITEM */
const Info = ({ icon, text }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="flex items-center gap-2 mb-4 bg-white/10 px-4 py-2 rounded-full backdrop-blur"
  >
    {icon}
    <span>{text}</span>
  </motion.div>
);

export default Contact;
