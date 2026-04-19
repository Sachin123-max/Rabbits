import { Link } from "react-router-dom";
import mensCollectionImage from "../assets/mens-collection.webp";
import womensCollectionImage from "../assets/womens-collection.webp";

const GenderCollectionSection = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto grid md:grid-cols-2 gap-6">

        {/* WOMEN */}
        <div className="relative group overflow-hidden rounded-xl">
          <img
            src={womensCollectionImage}
            alt="Women's Collection"
            className="w-full h-[400px] md:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

          {/* Content */}
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Women's Collection
            </h2>
            <Link
              to="/collection/all?gender=Women"
              className="underline text-sm"
            >
              Shop Now →
            </Link>
          </div>
        </div>

        {/* MEN */}
        <div className="relative group overflow-hidden rounded-xl">
          <img
            src={mensCollectionImage}
            alt="Men's Collection"
            className="w-full h-[400px] md:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

          {/* Content */}
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Men's Collection
            </h2>
            <Link
              to="/collection/all?gender=Men"
              className="underline text-sm"
            >
              Shop Now →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GenderCollectionSection;