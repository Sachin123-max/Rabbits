import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slices/adminProductSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    if (authLoading) return;

    setIsCheckingAuth(false);

    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    dispatch(fetchAdminProducts());
  }, [dispatch, user, navigate, authLoading]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  if (isCheckingAuth || authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <p className="animate-pulse text-gray-600">Loading...</p>
      </div>
    );
  }

  if (loading)
    return <p className="text-center mt-10 animate-pulse">Loading...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-100 via-white to-slate-200">

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        🛒 Product Management
      </h2>

      {/* TABLE CARD */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl overflow-hidden transform transition-all hover:scale-[1.01]">

        <table className="min-w-full text-sm">
          <thead className="bg-gray-900 text-white uppercase text-xs">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products?.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    animation: `fadeIn 0.3s ease-in-out ${index * 0.05}s both`,
                  }}
                >
                  <td className="p-4 font-semibold text-gray-900">
                    {product.name}
                  </td>

                  <td className="p-4 text-green-600 font-medium">
                    ${product.price}
                  </td>

                  <td className="p-4 text-gray-600">
                    {product.sku}
                  </td>

                  <td className="p-4 flex gap-2">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="px-3 py-1 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow hover:scale-105 active:scale-95 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white shadow hover:scale-105 active:scale-95 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center p-6 text-gray-500"
                >
                  No Products Found
                </td>
              </tr>
            )}
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

export default ProductManagement;