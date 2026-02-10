import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import useAuthContext from "../../hooks/useAuthContext";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  const recentOrder = async () => {
    try {
      const response = await authApiClient.get("/orders/");
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    recentOrder();
  }, []);

  if (loading) {
    return (
      <div className="mt-6 bg-base-100 border rounded-xl p-6 shadow-sm">
        <p className="text-base-content/60">Loading recent orders...</p>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-base-100 border rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-5 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
        <span className="text-sm text-base-content/60">
          {orders.length} orders
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>Products</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-base-content/60"
                >
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="max-w-xs whitespace-normal">
                    {order.items && order.items.length > 0
                      ? order.items.map((item, i) => (
                          <span key={i}>
                            {item.product.name} × {item.quantity}
                            {i !== order.items.length - 1 && ", "}
                          </span>
                        ))
                      : "No products"}
                  </td>

                  <td>{user?.first_name || "Unknown"}</td>

                  <td>
                    <span
                      className={`badge badge-outline ${
                        order.status === "Completed"
                          ? "badge-success"
                          : order.status === "Processing"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>

                  <td className="text-right font-medium">
                    ${order.total_price.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
