import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/login.webp";
import {loginUser} from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {user,guestId} = useSelector((state)=> state.auth);
    const {cart} = useSelector((state) => state.cart);

    // Get redirect paramenter and check if it checkout or something
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if(user && guestId){
            // Check localStorage for cart products (this is the source of truth for guest carts)
            const currentCart = JSON.parse(localStorage.getItem("cart") || '{"products":[]}');
            
            if(currentCart.products.length > 0){
                // Only merge if there are products in the local cart
                dispatch(mergeCart({guestId, userId: user._id})).then(()=> {
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
                });
            }else{
                // No cart to merge, just navigate
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            }
        }
    },[user,guestId, navigate, isCheckoutRedirect, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Client-side validation
    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password");
      return;
    }
    dispatch(loginUser({email: email.trim(), password}));
  };

  return (
    <div className="flex">
        <div className="w-full md:w-1/2  flex flex-col justify-center items-center p-8 md:p-12">
          <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
            <div className="flex justify-center mb-6">
                <h2 className="text-xl fonnt-medium">Rabbit</h2>
            </div>
            <h2 className="text-2xl font-bold text-center mb-6">Hey there! </h2>
            <p className="text-center mb-6">
                Enter your username and Password to Login
            </p>
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-2"> Email</label>
                <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter your email address" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-2"> Password</label>
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter your password " />
            </div>
            <button type="submit" className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition">Sign In</button>
            <p className="mt-6 text-center text-sm">
                Don't have an account? {" "}
                <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">Register</Link>
            </p>
          </form>
        </div>
        <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
            <img src={login} alt="Login to Account " className="h-[750 px] w-full object-cover" />
        </div>
        </div>
    </div>
  )
}

export default Login
