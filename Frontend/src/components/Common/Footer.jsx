import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white pt-16 overflow-hidden">

      {/* glowing background */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[140px] top-[-100px] left-[-100px] rounded-full" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[140px] bottom-[-100px] right-[-100px] rounded-full" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 lg:px-0 relative z-10">

        {/* NEWSLETTER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl"
        >
          <h3 className="text-lg mb-3 font-semibold">Newsletter 🚀</h3>
          <p className="text-gray-300 text-sm mb-3">
            Get updates on new drops & exclusive offers.
          </p>
          <p className="text-gray-400 text-xs mb-5">
            Sign up & get 10% off your first order
          </p>

          <form className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-3 text-sm rounded-l-xl bg-white/10 border border-white/10 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 rounded-r-xl text-sm font-semibold"
            >
              Join
            </button>
          </form>
        </motion.div>

        {/* SHOP */}
        <FooterCard title="Shop">
          <FooterLink text="Men's Top Wear" />
          <FooterLink text="Women's Top Wear" />
          <FooterLink text="Men's Bottom Wear" />
          <FooterLink text="Women's Bottom Wear" />
        </FooterCard>

        {/* SUPPORT */}
        <FooterCard title="Support">
          <FooterLink to="/contact" text="Contact Us" />
          <FooterLink to="/about" text="About Us" />
          <FooterLink to="/reviews" text="Reviews" />
          <FooterLink to="/features" text="Features" />
        </FooterCard>

        {/* SOCIAL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl"
        >
          <h3 className="text-lg mb-4 font-semibold">Follow Us</h3>

          <div className="flex gap-4 mb-6">
            <SocialIcon icon={<TbBrandMeta />} />
            <SocialIcon icon={<IoLogoInstagram />} />
            <SocialIcon icon={<RiTwitterXLine />} />
          </div>

          <div className="text-gray-300 text-sm">
            <p className="mb-2">Call Us</p>
            <div className="flex items-center gap-2">
              <FiPhoneCall />
              <span>0123-456-789</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* bottom */}
      <div className="mt-14 border-t border-white/10 py-6 text-center text-gray-400 text-sm relative z-10">
        © 2026 Rabbit. All Rights Reserved
      </div>
    </footer>
  );
};

/* reusable card */
const FooterCard = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl"
  >
    <h3 className="text-lg mb-4 font-semibold">{title}</h3>
    <ul className="space-y-2 text-gray-300 text-sm">{children}</ul>
  </motion.div>
);

/* link */
const FooterLink = ({ to = "#", text }) => (
  <li>
    <Link to={to} className="hover:text-white transition">
      {text}
    </Link>
  </li>
);

/* social icon */
const SocialIcon = ({ icon }) => (
  <motion.a
    whileHover={{ scale: 1.2, rotate: 5 }}
    href="#"
    className="p-2 bg-white/10 rounded-full border border-white/10"
  >
    {icon}
  </motion.a>
);

export default Footer;