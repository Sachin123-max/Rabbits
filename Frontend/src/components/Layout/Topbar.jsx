import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { motion } from "framer-motion";

const Topbar = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 py-2 text-white shadow-md">

      <div className="container mx-auto flex justify-between items-center py-2 px-4">

        {/* LEFT SOCIAL ICONS */}
        <div className="hidden md:flex items-center space-x-4">

          {[TbBrandMeta, IoLogoInstagram, RiTwitterXLine].map(
            (Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.3, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-black transition"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            )
          )}
        </div>

        {/* CENTER TEXT (animated glow) */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6], y: [0, -1, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-sm text-center flex-1"
        >
          <span className="tracking-wide">
            🚚 We ship worldwide — Fast & reliable delivery!
          </span>
        </motion.div>

        {/* RIGHT PHONE */}
        <motion.div whileHover={{ scale: 1.05 }} className="text-sm">
          <a href="tel:+1234567890" className="hover:text-black transition">
            +1 (234) 567-890
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Topbar;