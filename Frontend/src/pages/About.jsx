import { Link } from "react-router-dom";
import aboutImage from "../assets/login.webp";
import {
  HiOutlineUserGroup,
  HiOutlineStar,
  HiOutlineHeart,
} from "react-icons/hi";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">

      {/* Floating glow background */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[120px] top-[-100px] left-[-100px] rounded-full" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] bottom-[-100px] right-[-100px] rounded-full" />

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
          transitionSpeed={1500}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">

            <motion.h2
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-3xl font-bold text-center mb-2"
            >
              About Rabbit 🐰
            </motion.h2>

            <p className="text-center text-gray-300 mb-6">
              Premium fashion brand built for modern lifestyle
            </p>

            <Feature
              icon={<HiOutlineUserGroup />}
              title="Our Story"
              text="Built with passion for fashion and innovation, delivering premium clothing worldwide."
            />

            <Feature
              icon={<HiOutlineStar />}
              title="Our Mission"
              text="To empower individuals with stylish, sustainable and high-quality fashion."
            />

            <Feature
              icon={<HiOutlineHeart />}
              title="Why Choose Us"
              list={[
                "Premium quality materials",
                "Trendy modern designs",
                "Fast worldwide shipping",
                "Easy 30-day returns",
              ]}
            />

            <div className="mt-8 text-center">
              <Link
                to="/contact"
                className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Tilt>
      </motion.div>

      {/* RIGHT IMAGE 3D SECTION */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex w-1/2 items-center justify-center relative"
      >
        <Tilt
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          scale={1.05}
          className="w-[70%]"
        >
          <motion.img
            src={aboutImage}
            alt="about"
            className="rounded-3xl shadow-2xl border border-white/20"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
        </Tilt>
      </motion.div>
    </div>
  );
};

/* FEATURE CARD */
const Feature = ({ icon, title, text, list }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-start gap-4 mb-6 bg-white/5 p-4 rounded-xl border border-white/10"
    >
      <div className="text-2xl">{icon}</div>

      <div>
        <h3 className="font-semibold text-lg">{title}</h3>

        {text && <p className="text-sm text-gray-300">{text}</p>}

        {list && (
          <ul className="text-sm text-gray-300 list-disc ml-4 mt-1 space-y-1">
            {list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default About;