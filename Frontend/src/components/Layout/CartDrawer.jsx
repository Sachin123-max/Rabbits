import React from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import CartContexts from "../Cart/CartContexts";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const userId = user ? user._id : null;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <>
      {/* OVERLAY */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCartDrawer}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* DRAWER */}
      <motion.div
        initial={{ x: 400, rotateY: 15, opacity: 0 }}
        animate={
          drawerOpen
            ? { x: 0, rotateY: 0, opacity: 1 }
            : { x: 400, rotateY: 15, opacity: 0 }
        }
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="
          fixed top-0 right-0 h-full w-[85%] sm:w-[60%] md:w-[400px]
          bg-white/80 backdrop-blur-xl
          shadow-2xl z-50 flex flex-col
          border-l border-white/20
          perspective-[1200px]
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-white/60 backdrop-blur">
          <h2 className="text-lg font-semibold tracking-wide">
            Shopping Cart 🛒
          </h2>

          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={toggleCartDrawer}
            className="p-1 rounded-full hover:bg-gray-200 transition"
          >
            <IoMdClose className="h-6 w-6 text-gray-700" />
          </motion.button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart && cart?.products?.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CartContexts cart={cart} userId={userId} guestId={guestId} />
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-4xl mb-2"
              >
                🛒
              </motion.div>
              <p>Your cart is empty</p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {cart && cart?.products?.length > 0 && (
          <div className="border-t p-4 bg-white/70 backdrop-blur">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
              className="
                w-full bg-gradient-to-r from-black to-gray-800
                text-white py-3 rounded-xl font-semibold
              "
            >
              Proceed to Checkout
            </motion.button>

            <p className="text-xs text-gray-500 mt-2 text-center">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CartDrawer;