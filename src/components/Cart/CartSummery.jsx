import { Link } from "react-router-dom";

const CartSummary = ({ totalPrice, itemCount }) => {
  const shipping = parseFloat(totalPrice) > 100 ? 0 : 10;
  const tax = totalPrice * 0.1;
  const orderTotal = totalPrice + shipping + tax;

  return (
    <div className="card bg-base-100 border border-base-200 shadow-md rounded-xl">
      <div className="card-body space-y-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">
              Subtotal ({itemCount} items)
            </span>
            <span className="font-medium">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? "Free" : `$${shipping}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Estimated Tax</span>
            <span className="font-medium">
              ${tax.toFixed(2)}
            </span>
          </div>

          <div className="divider my-2"></div>

          <div className="flex justify-between text-lg font-semibold">
            <span>Order Total</span>
            <span className="text-primary">
              ${orderTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <Link
          to="/checkout"
          className="btn btn-primary btn-lg w-full"
        >
          Proceed To Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
