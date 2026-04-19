import { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-100 via-white to-gray-200">

      {/* MOBILE TOPBAR */}
      <div className="flex md:hidden items-center p-4 bg-gray-900 text-white shadow-lg z-20">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-700 transition transform active:scale-90"
        >
          <FaBars />
        </button>
        <h1 className="ml-4 text-xl font-semibold tracking-wide">
          Admin Dashboard
        </h1>
      </div>

      {/* OVERLAY */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-10 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 z-20
        bg-gray-900 text-white shadow-2xl
        transform transition-transform duration-500 ease-in-out
        ${isSidebarOpen ? "translate-x-0 rotate-y-0" : "-translate-x-full md:translate-x-0"}
        md:rotate-y-0`}
        style={{
          perspective: "1000px",
        }}
      >
        <div className="h-full shadow-[0_0_40px_rgba(0,0,0,0.4)]">
          <AdminSidebar />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 md:ml-0 transition-all duration-300">
        <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[90vh] transform hover:scale-[1.01] transition duration-300">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default AdminLayout;