import { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";

import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import FeaturedCollection from "../Products/FeaturedCollection";
import FeaturesSection from "../Products/FeaturesSection";
import GenderCollectionSection from "../Products/GenderCollectionSection";
import NewArrivals from "../Products/NewArrivals";
import ProductDetails from "../Products/ProductDetails";
import ProductGrid from "../Products/ProductGrid";

const fadeUp = {
  hidden: { opacity: 0, y: 60, rotateX: 10 },
  visible: { opacity: 1, y: 0, rotateX: 0 },
};

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((s) => s.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Top Wear",
        limit: 8,
      })
    );

    const fetchBestSeller = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <div className="bg-gray-50 overflow-x-hidden perspective-[1200px]">

      {/* HERO (dark cinematic 3D) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-black via-gray-900 to-black text-white transform-gpu"
      >
        <Hero />
      </motion.section>

      {/* GENDER SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="py-10 bg-gradient-to-r from-blue-50 to-indigo-50
                   transform-gpu hover:scale-[1.01] transition duration-300"
      >
        <GenderCollectionSection />
      </motion.section>

      {/* NEW ARRIVALS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-10 bg-white shadow-lg rounded-3xl mx-3 my-6
                   transform-gpu hover:rotate-x-[2deg] hover:scale-[1.01] transition"
      >
        <NewArrivals />
      </motion.section>

      {/* BEST SELLER */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="py-12 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100"
      >
        <h2 className="text-3xl text-center font-bold mb-6">
          Best Seller 🔥
        </h2>

        <motion.div
          whileHover={{ scale: 1.02, rotateX: 2 }}
          className="transform-gpu transition"
        >
          {bestSellerProduct ? (
            <ProductDetails productId={bestSellerProduct._id} />
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </motion.div>
      </motion.section>

      {/* WOMEN PRODUCTS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-12 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl text-center font-bold mb-6">
            Top Wears For Women
          </h2>

          <motion.div
            whileHover={{ scale: 1.01, rotateX: 1 }}
            className="transform-gpu"
          >
            <ProductGrid
              products={products}
              loading={loading}
              error={error}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURED */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="py-10 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-100"
      >
        <FeaturedCollection />
      </motion.section>

      {/* FEATURES */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="py-10 bg-gray-100"
      >
        <FeaturesSection />
      </motion.section>

    </div>
  );
};

export default Home;