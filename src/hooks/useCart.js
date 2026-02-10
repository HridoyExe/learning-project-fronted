import { useCallback, useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useCart = () => {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);

  // =======================
  // Create or Get Cart
  // =======================
  const createOrGetCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authApiClient.post("carts/");
      localStorage.setItem("cartId", response.data.id);
      setCartId(response.data.id);
      setCart(response.data);
      return response.data; // return cart data
    } catch (error) {
      console.log("Error creating cart:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // =======================
  // Add Item to Cart
  // =======================
  const addCartItems = useCallback(
    async (product_id, quantity) => {
      setLoading(true);
      try {
        let currentCartId = cartId;
        if (!currentCartId) {
          const newCart = await createOrGetCart();
          currentCartId = newCart?.id;
        }
        if (!currentCartId) throw new Error("Cart not available");

        const response = await authApiClient.post(
          `carts/${currentCartId}/items/`,
          { product_id, quantity }
        );
        // Update local cart state
        setCart((prev) => ({
          ...prev,
          items: [...(prev?.items || []), response.data],
        }));
      } catch (error) {
        console.log("Error adding items to cart:", error);
      } finally {
        setLoading(false);
      }
    },
    [cartId, createOrGetCart]
  );

  // =======================
  // Update Cart Item Quantity
  // =======================
  const updateCartItemQuantity = useCallback(
    async (itemId, quantity) => {
      try {
        const response = await authApiClient.patch(
          `carts/${cartId}/items/${itemId}/`,
          { quantity }
        );
        // Update local cart state
        setCart((prev) => ({
          ...prev,
          items: prev?.items.map((item) =>
            item.id === itemId ? response.data : item
          ),
        }));
      } catch (error) {
        console.log("Error updating cart item quantity:", error);
      }
    },
    [cartId]
  );

  // =======================
  // Delete Cart Item
  // =======================
  const deleteCartItems = useCallback(
    async (itemId) => {
      try {
        await authApiClient.delete(`carts/${cartId}/items/${itemId}/`);
        // Update local cart state
        setCart((prev) => ({
          ...prev,
          items: prev?.items.filter((item) => item.id !== itemId),
        }));
      } catch (error) {
        console.log("Error deleting cart item:", error);
      }
    },
    [cartId]
  );

  // =======================
  // Initialize Cart on Mount
  // =======================
  useEffect(() => {
    const initializeCart = async () => {
      setLoading(true);
      await createOrGetCart();
      setLoading(false);
    };
    initializeCart();
  }, [createOrGetCart]);

  return {
    cart,
    cartId,
    loading,
    createOrGetCart,
    addCartItems,
    updateCartItemQuantity,
    deleteCartItems,
  };
};

export default useCart;
