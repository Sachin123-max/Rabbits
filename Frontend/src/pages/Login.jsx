import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../assets/login.webp";
import { loginUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading } = useSelector((s) => s.auth);

  const redirect =
    new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user && guestId) {
      const currentCart = JSON.parse(
        localStorage.getItem("cart") || '{"products":[]}'
      );

      if (currentCart.products.length > 0) {
        dispatch(mergeCart({ guestId, userId: user._id })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please enter both email and password");
    }

    dispatch(loginUser({ email: email.trim(), password }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">

      {/* glow background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[150px] top-[-120px] left-[-120px] rounded-full" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[150px] bottom-[-120px] right-[-120px] rounded-full" />

      {/* LEFT LOGIN FORM */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full md:w-1/2 flex items-center justify-center p-6 relative z-10"
      >
        <Tilt
          tiltMaxAngleX={12}
          tiltMaxAngleY={12}
          scale={1.02}
          className="w-full max-w-md"
        >
          <form className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">

            <motion.h2
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-3xl font-bold text-center mb-2"
            >
              Welcome Back 👋
            </motion.h2>

            <p className="text-center text-gray-300 mb-6">
              Login to continue shopping
            </p>

            <Input label="Email" value={email} setValue={setEmail} type="email" />
            <Input label="Password" value={password} setValue={setPassword} type="password" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 rounded-xl font-semibold"
            >
              {loading ? "Loading..." : "Sign In"}
            </motion.button>

            <p className="text-center mt-4 text-sm text-gray-300">
              Don’t have account?{" "}
              <Link
                to={`/register?redirect=${encodeURIComponent(redirect)}`}
                className="text-blue-400"
              >
                Register
              </Link>
            </p>
          </form>
        </Tilt>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden md:flex w-1/2 items-center justify-center relative z-10"
      >
        <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05}>
          <motion.img
            src={loginImg}
            className="w-[70%] rounded-3xl shadow-2xl border border-white/20"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />
        </Tilt>
      </motion.div>
    </div>
  );
};

/* INPUT */
const Input = ({ label, value, setValue, type = "text" }) => (
  <div className="mb-4">
    <label className="text-sm text-gray-300">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={`Enter ${label}`}
      className="w-full mt-1 p-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default Login;