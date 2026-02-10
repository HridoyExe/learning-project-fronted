import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiCreditCard, FiTruck, FiMapPin } from "react-icons/fi";
import useCartContext from "../hooks/useCartContext";
import useAuthContext from "../hooks/useAuthContext";
import authApiClient from "../services/auth-api-client";
import ErrorAlert from "../components/ErrorAlert";

const Checkout = () => {
    const { cart, cartId, createOrGetCart } = useCartContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        firstName: user?.first_name || "",
        lastName: user?.last_name || "",
        email: user?.email || "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        paymentMethod: "cod", // cod or online
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!cartId) {
            setError("Cart is empty or not found.");
            setLoading(false);
            return;
        }

        try {
            // Assuming the backend accepts these fields. If not, they might be ignored.
            // Ideally, the backend should be updated to handle address data.
            const orderData = {
                cart_id: cartId,
                shipping_address: `${formData.address}, ${formData.city} - ${formData.postalCode}`,
                phone: formData.phone,
                payment_method: formData.paymentMethod,
            };

            const response = await authApiClient.post("/orders/", orderData);

            if (response.status === 201) {
                // Clear cart ID from local storage as it's now converted to an order
                localStorage.removeItem("cartId");
                // Create a new cart for future use
                createOrGetCart();

                if (formData.paymentMethod === "online") {
                    // Initiate Payment
                    try {
                        const paymentRes = await authApiClient.post("/payment/initiate/", {
                            order_id: response.data.id,
                            amount: total
                        });
                        // Assuming the response contains a redirect URL or similar
                        if (paymentRes.data?.gateway_url) {
                            window.location.href = paymentRes.data.gateway_url;
                            return;
                        }
                    } catch (payErr) {
                        console.error("Payment initiation failed", payErr);
                        setError("Order placed but payment initiation failed. Please check orders.");
                        navigate("/dashboard/orders");
                        return;
                    }
                }

                navigate("/dashboard/orders");
            }
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.detail || "Failed to place order. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Your cart is empty
                </h2>
                <button
                    onClick={() => navigate("/shop")}
                    className="btn btn-primary"
                >
                    Go to Shop
                </button>
            </div>
        );
    }

    const subtotal = cart.total_price || 0;
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    <p className="mt-2 text-gray-600">
                        Complete your order by providing your shipping details.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Shipping Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <FiMapPin size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Shipping Address
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Where should we send your order?
                                    </p>
                                </div>
                            </div>

                            <form id="checkout-form" onSubmit={handlePlaceOrder}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="input input-bordered w-full focus:input-primary"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="input input-bordered w-full focus:input-primary"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            disabled
                                            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="input input-bordered w-full focus:input-primary"
                                            placeholder="+880 1XXX XXXXXX"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        className="input input-bordered w-full focus:input-primary"
                                        placeholder="House #123, Street #4, Block C"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            className="input input-bordered w-full focus:input-primary"
                                            placeholder="Dhaka"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleChange}
                                            required
                                            className="input input-bordered w-full focus:input-primary"
                                            placeholder="1212"
                                        />
                                    </div>
                                </div>

                                {/* Payment Method Section */}
                                <div className="border-t border-gray-100 pt-8">
                                    <div className="flex items-center gap-3 mb-6 pb-4">
                                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                            <FiCreditCard size={20} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                Payment Method
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                Select how you want to pay
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <label
                                            className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === "cod"
                                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cod"
                                                checked={formData.paymentMethod === "cod"}
                                                onChange={handleChange}
                                                className="radio radio-primary mr-3"
                                            />
                                            <div>
                                                <span className="block font-medium text-gray-900">
                                                    Cash on Delivery
                                                </span>
                                                <span className="block text-sm text-gray-500">
                                                    Pay when you receive
                                                </span>
                                            </div>
                                        </label>

                                        <label
                                            className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === "online"
                                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="online"
                                                checked={formData.paymentMethod === "online"}
                                                onChange={handleChange}
                                                className="radio radio-primary mr-3"
                                            />
                                            <div>
                                                <span className="block font-medium text-gray-900">
                                                    Online Payment
                                                </span>
                                                <span className="block text-sm text-gray-500">
                                                    Cards, Mobile Banking
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                                {cart.items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.product.images?.length > 0 ? item.product.images[0].image : "https://via.placeholder.com/150"}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-900 truncate">
                                                {item.product.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity} × ${item.product.price}
                                            </p>
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">
                                            ${(item.quantity * item.product.price).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-b border-gray-100 py-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium text-gray-900">
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium text-gray-900">
                                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax (10%)</span>
                                    <span className="font-medium text-gray-900">
                                        ${tax.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-4 mb-6">
                                <span className="text-base font-bold text-gray-900">Total</span>
                                <span className="text-xl font-bold text-primary">
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            {error && <ErrorAlert error={error} />}

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={loading}
                                className="w-full btn btn-primary flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <>
                                        <FiCheckCircle size={20} /> Place Order
                                    </>
                                )}
                            </button>

                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                                <FiTruck /> Free shipping on orders over $100
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
