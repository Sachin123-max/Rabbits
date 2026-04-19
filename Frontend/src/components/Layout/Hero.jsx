import { Link } from "react-router-dom";
import heroImg from "../../assets/rabbit-hero.webp";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">

      {/* IMAGE */}
      <img
        src={heroImg}
        alt="Hero"
        className="w-full h-[500px] md:h-[650px] lg:h-[800px] object-cover scale-105 hover:scale-110 transition duration-700"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
        
        {/* CONTENT */}
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-xl justify-content-center text-white">

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-fadeIn">
              Vacation <br />
              Ready
            </h1>

            <p className="text-sm md:text-lg mb-6 text-gray-200">
              Discover stylish outfits made for your next getaway. 
              Comfort meets trend — delivered worldwide.
            </p>

            {/* BUTTONS */}
            <div className="flex gap-4">
              <Link
                to="/collection/all"
                className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition"
              >
                Shop Now
              </Link>

              <Link
                to="/collection/all?gender=Women"
                className="border border-white px-6 py-3 hover:bg-white hover:text-black transition"
              >
                Explore Women
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;