import { FaTrash } from "react-icons/fa";

const CartItemList = ({ items, handleUpdateQuantity, handleRemoveCartItems }) => {
  if (!items || items.length === 0) {
    return (
      <div className="py-10 text-center text-gray-400 text-lg">
        🛒 Your cart is currently empty
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-xl shadow-sm border border-base-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Product</th>
              <th className="text-right">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-right">Total</th>
              <th className="text-center">Remove</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-base-200/40 transition">
                <td className="font-medium">
                  {item.product.name}
                </td>

                <td className="text-right">
                  ${item.product.price}
                </td>

                <td>
                  <div className="flex justify-center">
                    <div className="join">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            handleUpdateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            );
                          }
                        }}
                        className="btn btn-xs join-item"
                      >
                        −
                      </button>

                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(item.id, Number(e.target.value))
                        }
                        className="input input-xs join-item w-14 text-center
                          [appearance:textfield]
                          [&::-webkit-outer-spin-button]:appearance-none
                          [&::-webkit-inner-spin-button]:appearance-none"
                      />

                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="btn btn-xs join-item"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </td>

                <td className="text-right font-semibold">
                  ${item.total_price ?? item.product.price * item.quantity}
                </td>

                <td className="text-center">
                  <button
                    onClick={() => handleRemoveCartItems(item.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartItemList;
