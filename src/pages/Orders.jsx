import { useEffect, useState } from "react";
import OrderCart from "../components/Order/OrderCart";
import authApiClient from "../services/auth-api-client";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await authApiClient.get("/orders/");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await authApiClient.post(`/orders/${orderId}/cancel/`);
      if (response.status === 200) {
        setOrders(prevOrders =>
          prevOrders.map(order => order.id === orderId ? { ...order, status: "Canceled" } : order)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-4">
      <h1 className="font-bold text-2xl mb-6">Order Details</h1>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map(order => <OrderCart key={order.id} order={order} onCancel={handleCancelOrder} />)
      )}
    </div>
  );
};

export default Orders;
