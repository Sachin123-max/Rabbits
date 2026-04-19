import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/adminOrderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { orders, loading: ordersLoading, error } = useSelector(
    (state) => state.adminOrders
  );

  useEffect(() => {
    if (authLoading) return;

    setIsCheckingAuth(false);

    if (!user || user.role !== "admin") {
      navigate("/login");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate, authLoading]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  if (isCheckingAuth || authLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <p className="text-gray-600 animate-pulse">Loading...</p>
      </div>
    );

  if (ordersLoading)
    return <p className="text-center mt-10 animate-pulse">Loading orders...</p>;

  if (error)
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-100 via-white to-slate-200">

      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">
        🚀 Order Management
      </h2>

      {/* Table Container (3D Card) */}
      <div className="rounded-2xl shadow-2xl bg-white/70 backdrop-blur-md border border-gray-200 overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">

        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-900 text-white uppercase text-xs">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders?.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg"
                  style={{
                    animation: `fadeIn 0.3s ease-in-out ${index * 0.05}s both`,
                  }}
                >
                  <td className="p-4 font-medium text-gray-900">
                    #{order._id.slice(-6)}
                  </td>

                  <td className="p-4">{order.user?.name}</td>

                  <td className="p-4 font-semibold text-green-600">
                    ${order.totalPrice.toFixed(2)}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="px-3 py-2 rounded-xl border bg-white shadow-sm focus:ring-2 focus:ring-blue-400 transition"
                    >
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>

                  {/* ACTION */}
                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleStatusChange(order._id, "Delivered")
                      }
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:scale-105 active:scale-95 transition"
                    >
                      Mark Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-6 text-gray-500"
                >
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 3D Animation Keyframes */}
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

export default OrderManagement;