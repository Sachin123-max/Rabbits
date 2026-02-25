import { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import FeaturedCollection from "../Products/FeaturedCollection";
import FeaturesSection from "../Products/FeaturesSection";
import GenderCollectionSection from "../Products/GenderCollectionSection";
import NewArrivals from "../Products/NewArrivals";
import ProductDetails from "../Products/ProductDetails";
import ProductGrid from "../Products/ProductGrid";



const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    //Fetch Products for  a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Top Wear",
        limit: 8,
      }),
    );

    //Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`,
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Error fetching best seller:", error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {/*Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4"> Best Seller</h2>
      {bestSellerProduct ? (
      <ProductDetails productId={bestSellerProduct._id}/>):(<p className="text-center">Loading best seller product....</p>)}
      {/* <ProductDetails /> */}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-center font-bold mb-4">
          Top Wears For Women
        </h2>
        {/* Using API data from Redux */}
        <ProductGrid products={products} loading={loading} error={error}/>
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
