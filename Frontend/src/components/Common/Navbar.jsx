import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((t, p) => t + p.quantity, 0) || 0;

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 shadow-md"
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">

          {/* LOGO */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/"
              className="text-2xl font-bold tracking-wide hover:tracking-widest transition-all"
            >
              Rabbit
            </Link>
          </motion.div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex space-x-6">
            {["Men", "Women", "Top Wear", "Bottom Wear"].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotateX: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={`/collection/all?${
                    item === "Men" || item === "Women"
                      ? "gender=" + item
                      : "category=" + item
                  }`}
                  className="text-gray-700 hover:text-black text-sm font-medium uppercase"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center space-x-4">

            {/* ADMIN */}
            {user?.role === "admin" && (
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  to="/admin"
                  className="bg-black text-white px-2 py-1 rounded text-sm"
                >
                  Admin
                </Link>
              </motion.div>
            )}

            {/* USER */}
            <motion.div whileHover={{ scale: 1.2 }}>
              <Link to="/profile">
                <HiOutlineUser className="h-6 w-6 text-gray-700" />
              </Link>
            </motion.div>

            {/* CART */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDrawerOpen(true)}
              className="relative"
            >
              <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />

              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.button>

            {/* SEARCH */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* MOBILE MENU */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => setNavDrawerOpen(true)}
              className="md:hidden"
            >
              <HiBars3BottomRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* CART DRAWER */}
      <CartDrawer
        drawerOpen={drawerOpen}
        toggleCartDrawer={() => setDrawerOpen(false)}
      />

      {/* MOBILE MENU */}
      <AnimatePresence>
        {navDrawerOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-2xl z-50"
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setNavDrawerOpen(false)}>
                <IoMdClose className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {[
                "Men",
                "Women",
                "Top Wear",
                "Bottom Wear",
                "Contact",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                >
                  <Link
                    to="/collection/all"
                    onClick={() => setNavDrawerOpen(false)}
                    className="block text-gray-700 text-lg"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;