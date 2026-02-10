import { useState } from "react";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import useCartContext from "../../hooks/useCartContext";

const AddToCartButton = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { addCartItems } = useCartContext();

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCart = async () => {
    setIsAdding(true);
    try {
      await addCartItems(product.id, quantity);
      setIsAdded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <div className="join">
          <button
            className="btn btn-outline btn-sm join-item"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <FaMinus />
          </button>

          <input
            type="number"
            value={quantity}
            min={1}
            max={product?.stock}
            readOnly
            className="input input-bordered input-sm join-item w-16 text-center font-medium"
          />

          <button
            className="btn btn-outline btn-sm join-item"
            onClick={increaseQuantity}
            disabled={quantity >= product.stock}
          >
            <FaPlus />
          </button>
        </div>

        <span className="text-sm text-base-content/60">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={addToCart}
        disabled={isAdded || isAdding || product.stock === 0}
        className={`btn w-full transition-all ${isAdded
            ? "btn-success"
            : "btn-primary"
          }`}
      >
        {isAdding ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Adding...
          </>
        ) : isAdded ? (
          <>
            <FiCheck className="h-4 w-4" />
            Added to Cart
          </>
        ) : (
          <>
            <FaShoppingCart className="h-4 w-4" />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
};

export default AddToCartButton;
