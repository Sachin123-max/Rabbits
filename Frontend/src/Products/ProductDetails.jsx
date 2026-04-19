import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { FaHeart, FaStar } from "react-icons/fa";
import ProductGrid from "./ProductGrid";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../redux/slices/productsSlice";
import { addToCart } from "../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );

  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const productFetchId = productId || id;

  // 🔥 Fetch product
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  // 🔥 Set main image
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  // 🔥 Auto slider
  useEffect(() => {
    if (!selectedProduct?.images?.length) return;

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % selectedProduct.images.length;
      setMainImage(selectedProduct.images[index].url);
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Select size & color");
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => toast.success("Added to cart"))
      .finally(() => setIsButtonDisabled(false));
  };

  if (loading) return <p className="text-center p-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!selectedProduct) return <p>Product not found</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        
        {/* LEFT SIDE */}
        <div>
          {/* Main Image + Zoom */}
          <div className="overflow-hidden rounded-lg">
            <img
              src={mainImage}
              alt=""
              className="w-full h-[500px] object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
            {selectedProduct.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                onClick={() => setMainImage(img.url)}
                className={`w-20 h-20 object-cover cursor-pointer border rounded ${
                  mainImage === img.url ? "border-black" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {selectedProduct.name}
          </h1>

          {/* ⭐ Ratings */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
            <span className="text-gray-500 ml-2">(120 reviews)</span>
          </div>

          <p className="text-gray-500 line-through">
            ${selectedProduct.originalPrice}
          </p>
          <p className="text-2xl font-semibold text-black mb-4">
            ${selectedProduct.price}
          </p>

          <p className="text-gray-600 mb-6">
            {selectedProduct.description}
          </p>

          {/* COLOR */}
          <div className="mb-4">
            <p className="font-medium">Color</p>
            <div className="flex gap-2 mt-2">
              {selectedProduct.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColor === color
                      ? "ring-2 ring-black"
                      : ""
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="mb-4">
            <p className="font-medium">Size</p>
            <div className="flex gap-2 mt-2">
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className="bg-black text-white px-6 py-3 w-full rounded"
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </button>

            {/* ❤️ Wishlist */}
            <button
              onClick={() => setWishlist(!wishlist)}
              className={`p-3 border rounded ${
                wishlist ? "text-red-500" : ""
              }`}
            >
              <FaHeart />
            </button>
          </div>

          {/* DETAILS */}
          <div className="mt-8 text-sm text-gray-600">
            <p><strong>Brand:</strong> {selectedProduct.brand}</p>
            <p><strong>Material:</strong> {selectedProduct.material}</p>
          </div>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <div className="mt-20">
        <h2 className="text-2xl text-center mb-6">
          You may also like
        </h2>
        <ProductGrid
          products={similarProducts}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default ProductDetails;