import { Link } from "react-router-dom";
import {
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineSupport,
  HiOutlineCreditCard,
  HiOutlineStar,
} from "react-icons/hi";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">

      {/* glowing background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[140px] top-[-120px] left-[-120px] rounded-full" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[140px] bottom-[-120px] right-[-120px] rounded-full" />

      {/* LEFT CONTENT */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex items-center justify-center p-6"
      >
        <Tilt
          tiltMaxAngleX={12}
          tiltMaxAngleY={12}
          scale={1.02}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">

            <motion.h2
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-3xl font-bold text-center mb-2"
            >
              Our Features ⚡
            </motion.h2>

            <p className="text-center text-gray-300 mb-6">
              Everything you need for a premium shopping experience
            </p>

            <div className="space-y-5">
              <Feature icon={<HiOutlineTruck />} title="Free Shipping" />
              <Feature icon={<HiOutlineShieldCheck />} title="Secure Payment" />
              <Feature icon={<HiOutlineRefresh />} title="Easy Returns" />
              <Feature icon={<HiOutlineSupport />} title="24/7 Support" />
              <Feature icon={<HiOutlineCreditCard />} title="Fast Checkout" />
              <Feature icon={<HiOutlineStar />} title="Top Quality Products" />
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/contact"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Tilt>
      </motion.div>

      {/* RIGHT IMAGE 3D */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex w-1/2 items-center justify-center"
      >
        <Tilt
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          scale={1.05}
          className="w-[75%]"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
            alt="features"
            className="rounded-3xl shadow-2xl border border-white/20"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
        </Tilt>
      </motion.div>
    </div>
  );
};

/* FEATURE ITEM */
const Feature = ({ icon, title }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur"
    >
      <div className="text-2xl">{icon}</div>
      <h3 className="font-medium">{title}</h3>
    </motion.div>
  );
};

export default Features;