import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [products, setProducts] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchData = async () => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.get(`${backendUrl}/api/products/new-arrivals`);
      setProducts(res.data);
    };
    fetchData();
  }, []);

  // AUTO SCROLL
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    autoScrollRef.current = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5) {
        // LOOP BACK
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 3000); // every 3 sec

    return () => clearInterval(autoScrollRef.current);
  }, [products]);

  // PAUSE ON HOVER
  const stopAutoScroll = () => clearInterval(autoScrollRef.current);

  const startAutoScroll = () => {
    const el = scrollRef.current;
    autoScrollRef.current = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 3000);
  };

  // BUTTON SCROLL
  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  // UPDATE BUTTON STATE
  const updateScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollWidth > el.scrollLeft + el.clientWidth);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScroll);
    updateScroll();

    return () => el.removeEventListener("scroll", updateScroll);
  }, [products]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">New Arrivals 🔥</h2>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border hover:bg-black hover:text-white"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full border hover:bg-black hover:text-white"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div
          ref={scrollRef}
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {products.map((item) => (
            <div
              key={item._id}
              className="min-w-[260px] sm:min-w-[300px] bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={item.images[0]?.url}
                alt={item.name}
                className="w-full h-[320px] object-cover rounded-t-xl"
              />

              <div className="p-4">
                <Link to={`/product/${item._id}`}>
                  <h4 className="font-medium line-clamp-1">
                    {item.name}
                  </h4>
                </Link>
                <p className="text-gray-500 text-sm mt-1">
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;