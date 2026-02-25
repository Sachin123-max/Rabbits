import { Link } from "react-router-dom";
import aboutImage from "../assets/login.webp";
import { HiOutlineUserGroup, HiOutlineStar, HiOutlineHeart } from "react-icons/hi";

const About = () => {
  return (
    <div className="flex">
      {/* Left Side - Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">About Us</h2>
          <p className="text-gray-600 mb-6 text-center">
            Welcome to Rabbit - your destination for stylish and quality fashion.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <HiOutlineUserGroup className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Our Story</h3>
                <p className="text-gray-600 text-sm">
                  Founded with a passion for fashion, Rabbit has been delivering quality apparel to fashion-conscious customers worldwide. We believe in sustainable fashion that makes you look good feel good.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <HiOutlineStar className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Our Mission</h3>
                <p className="text-gray-600 text-sm">
                  To provide high-quality, trendy fashion that empowers individuals to express their unique style. We're committed to sustainable practices and ethical manufacturing.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <HiOutlineHeart className="h-8 w-8 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Why Choose Us</h3>
                <ul className="text-gray-600 text-sm list-disc list-inside">
                  <li>Premium quality materials</li>
                  <li>Trendy designs for every occasion</li>
                  <li>Excellent customer service</li>
                  <li>Fast and reliable shipping</li>
                  <li>30-day easy returns</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Want to learn more?</p>
            <Link
              to="/contact"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center p-12">
          <img
            src={aboutImage}
            alt="About Us"
            className="h-[750px] w-full object-cover opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
