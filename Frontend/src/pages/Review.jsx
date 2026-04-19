import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const Review = () => {
  const [reviews, setReviews] = useState([
    {
      name: "Aman",
      rating: 5,
      text: "Amazing quality! Fast delivery and perfect fit.",
    },
    {
      name: "Neha",
      rating: 4,
      text: "Very good product. Loved the fabric quality.",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    text: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.text) return;

    setReviews([form, ...reviews]);
    setForm({ name: "", rating: 5, text: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 text-green-900"
      >
        Customer Reviews ⭐
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8 container mx-auto">

        {/* REVIEW FORM */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-green-100"
        >
          <h2 className="text-xl font-semibold mb-4">Write a Review</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400"
            />

            {/* STAR RATING */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <FaStar
                  key={num}
                  onClick={() => setForm({ ...form, rating: num })}
                  className={`cursor-pointer text-xl transition ${
                    num <= form.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <textarea
              placeholder="Write your review..."
              value={form.text}
              onChange={(e) =>
                setForm({ ...form, text: e.target.value })
              }
              className="w-full p-3 border rounded-xl h-28 focus:ring-2 focus:ring-green-400"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
            >
              Submit Review
            </motion.button>
          </form>
        </motion.div>

        {/* REVIEW LIST */}
        <div className="space-y-4">

          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ scale: 1.02, rotateX: 2 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-lg border border-green-100"
            >

              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{r.name}</h3>

                <div className="flex">
                  {[...Array(r.rating)].map((_, idx) => (
                    <FaStar
                      key={idx}
                      className="text-yellow-400 text-sm"
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-600 text-sm">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;