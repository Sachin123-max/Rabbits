import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/slices/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      setIsCheckingAuth(false);

      if (user && user.role !== "admin") {
        navigate("/login");
      }
    }
  }, [user, navigate, authLoading]);

  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(fetchUsers());
    }
  }, [dispatch, user]);

  if (isCheckingAuth || authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <p className="animate-pulse text-gray-600">Loading...</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole }));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-100 via-white to-slate-200">

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        👤 User Management
      </h2>

      {/* FORM CARD */}
      <div className="bg-white/70 backdrop-blur-md border shadow-xl rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">➕ Add New User</h3>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:scale-105 active:scale-95 transition">
            Add User
          </button>

        </form>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white/70 backdrop-blur-md border shadow-2xl rounded-2xl overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-gray-900 text-white uppercase text-xs">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((userItem, index) => (
              <tr
                key={userItem._id}
                className="border-b hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                style={{
                  animation: `fadeIn 0.3s ease-in-out ${index * 0.05}s both`,
                }}
              >
                <td className="p-4 font-medium">{userItem.name}</td>

                <td className="p-4 text-gray-600">{userItem.email}</td>

                <td className="p-4">
                  <select
                    value={userItem.role}
                    onChange={(e) =>
                      handleRoleChange(userItem._id, e.target.value)
                    }
                    className="p-2 rounded-lg border"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleDeleteUser(userItem._id)}
                    className="px-3 py-1 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white shadow hover:scale-105 active:scale-95 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>

    </div>
  );
};

export default UserManagement;