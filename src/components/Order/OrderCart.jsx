import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import OrderTable from "./OrderTable";
import authApiClient from "../../services/auth-api-client";

const OrderCart = ({ order, onCancel }) => {
  const { user } = useAuthContext();
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    try {
      const response = await authApiClient.patch(
        `/orders/${order.id}/update_status/`,
        { status: newStatus }
      );
      if (response.status === 200) {
        setStatus(newStatus);
        alert(`Order status changed to "${newStatus}"`);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  };

  const handleCancel = async () => {
    try {
      await onCancel(order.id);
      setStatus("Canceled");
      alert("Order canceled successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to cancel order");
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await authApiClient.post("/payment/initiate/", {
        amount: order.total_price,
        orderId: order.id,
        numItems: order.items?.length,
      });

      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        setLoading(false);
        alert("Payment Failed");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Payment Failed");
    }
  };

  return (
    <div className="bg-base-100 border rounded-xl shadow-sm mb-8 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Order #{order.id}</h2>
          <p className="text-sm text-base-content/60">
            Placed on {new Date(order.created_at).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {user.is_staff ? (
            <select
              value={status}
              onChange={handleStatusChange}
              className="select select-sm select-bordered"
            >
              <option value="Not Paid">Not Paid</option>
              <option value="Ready To Ship">Ready To Ship</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          ) : (
            <span
              className={`badge badge-outline ${
                status === "Not Paid"
                  ? "badge-error"
                  : status === "Canceled"
                  ? "badge-neutral"
                  : "badge-success"
              }`}
            >
              {status}
            </span>
          )}

          {!user.is_staff &&
            status !== "Delivered" &&
            status !== "Canceled" && (
              <button
                onClick={handleCancel}
                className="btn btn-link btn-sm text-error"
              >
                Cancel
              </button>
            )}
        </div>
      </div>

      {/* Items */}
      <div className="p-5">
        <OrderTable items={order.items} />
      </div>

      {/* Footer */}
      <div className="border-t p-5 flex flex-col items-end gap-4">
        <div className="w-full max-w-xs space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-base-content/60">Subtotal</span>
            <span>${order.total_price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/60">Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total</span>
            <span>${order.total_price.toFixed(2)}</span>
          </div>
        </div>

        {!user.is_staff && status === "Not Paid" && (
          <button
            onClick={handlePayment}
            disabled={loading}
            className="btn btn-primary btn-sm"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCart;
