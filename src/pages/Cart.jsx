import { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiChevronRight } from "react-icons/fi";
import useCartContext from "../hooks/useCartContext";
import CartItemList from "../components/Cart/CartItemList";
import CartSummery from "../components/Cart/CartSummery";

const Cart = () => {
  const { cart, cartId, loading, createOrGetCart, updateCartItemQuantity, deleteCartItems } = useCartContext();
  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => { if (!cart && !loading) createOrGetCart(); }, [createOrGetCart, cart, loading]);
  useEffect(() => { setLocalCart(cart); }, [cart]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const prevLocalCartCopy = localCart;
    setLocalCart(prev => {
      const updatedItems = prev.items.map(item => item.id === itemId ? { ...item, quantity: newQuantity, total_price: item.product.price * newQuantity } : item);
      return { ...prev, items: updatedItems, total_price: updatedItems.reduce((sum, i) => sum + i.total_price, 0) };
    });
    try { await updateCartItemQuantity(itemId, newQuantity); } catch (error) { console.log(error); setLocalCart(prevLocalCartCopy); }
  };

  const handleRemoveCartItems = async (itemId) => {
    const prevLocalCartCopy = localCart;
    setLocalCart(prev => {
      const updatedItems = prev.items.filter(item => item.id !== itemId);
      return { ...prev, items: updatedItems, total_price: updatedItems.reduce((sum, i) => sum + i.total_price, 0) };
    });
    try { await deleteCartItems(itemId); } catch (error) { console.log(error); setLocalCart(prevLocalCartCopy); }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }
  if (!localCart) return <div className="min-h-screen flex items-center justify-center">No Cart Found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-professional mb-6 flex items-center text-sm text-gray-600 space-x-2">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <FiChevronRight />
        <span className="text-gray-900 font-medium">Shopping Cart</span>
      </div>

      <div className="container-professional mb-8">
        <h1 className="heading-1 flex items-center space-x-3">
          <FiShoppingCart className="text-blue-600" /> <span>Shopping Cart</span>
        </h1>
        <p className="text-muted mt-2">{localCart.items?.length || 0} {localCart.items?.length === 1 ? "item" : "items"}</p>
      </div>

      <div className="container-professional grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Suspense fallback={<p>Loading items...</p>}>
            <CartItemList items={localCart.items} handleUpdateQuantity={handleUpdateQuantity} handleRemoveCartItems={handleRemoveCartItems} />
          </Suspense>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <CartSummery totalPrice={localCart.total_price} itemCount={localCart.items.length} cartId={cartId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
