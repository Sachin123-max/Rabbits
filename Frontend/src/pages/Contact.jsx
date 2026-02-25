import { useState } from "react";
import { Link } from "react-router-dom";
import contactImage from "../assets/login.webp";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Contact Us</h2>
          <p className="text-center text-gray-500 mb-6">
            Have questions? We'd love to hear from you.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="How can we help you?"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Your message..."
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Send Message
          </button>

          <p className="mt-6 text-center text-sm">
            Or reach out to us directly{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Go to Home
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side - Contact Info & Image */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center p-12">
          <img
            src={contactImage}
            alt="Contact Us"
            className="h-[750px] w-full object-cover opacity-80"
          />
          <div className="absolute mt-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <HiOutlinePhone className="h-5 w-5" />
                <span>0123-456-789</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <HiOutlineMail className="h-5 w-5" />
                <span>support@rabbit.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <HiOutlineLocationMarker className="h-5 w-5" />
                <span>123 Fashion Street, New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
