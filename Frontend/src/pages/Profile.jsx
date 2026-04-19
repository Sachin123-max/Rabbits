import { useNavigate } from "react-router-dom";
import MyOrdersPage from "./MyOrdersPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { HiOutlineUserCircle } from "react-icons/hi2";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 md:px-6">

        {/* PAGE TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          My Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT PANEL */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            
            {/* AVATAR */}
            <div className="mb-4">
              <HiOutlineUserCircle className="h-20 w-20 text-gray-400" />
            </div>

            {/* USER INFO */}
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-500 text-sm mb-4">{user?.email}</p>

            {/* DIVIDER */}
            <div className="w-full border-t my-4"></div>

            {/* ACTION BUTTONS */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* RIGHT PANEL */}
          <div className="md:col-span-2 bg-green-200 rounded-xl shadow-md p-6">
            <MyOrdersPage/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;