import { Link } from "react-router-dom";
import { FiCheckCircle, FiArrowRight, FiShoppingBag, FiPackage } from "react-icons/fi";

const PaymentSuccess = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60"></div>

            <div className="max-w-xl w-full text-center relative z-10 animate-scale-in">
                <div className="bg-white rounded-3xl shadow-2xl p-10 lg:p-14 border border-gray-100">
                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 animate-bounce">
                            <FiCheckCircle size={60} />
                        </div>
                    </div>

                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Payment Successful!</h1>
                    <p className="text-lg text-gray-600 mb-10">
                        Thank you for your purchase. We've received your order and will start processing it right away.
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-6 mb-10 text-left border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Order Summary</h3>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-600">Status</span>
                            <span className="badge badge-success px-3 py-1 text-white font-medium">Confirmed</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-600">Delivery</span>
                            <span className="text-gray-900 font-semibold">Standard (3-5 Days)</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                            <span className="text-gray-900 font-bold">Payment Method</span>
                            <span className="text-blue-600 font-bold">Credit/Debit Card</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/orders"
                            className="btn-professional flex-1 flex items-center justify-center gap-2 py-4"
                        >
                            <FiPackage /> View Orders
                        </Link>
                        <Link
                            to="/home"
                            className="px-6 py-4 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition-all flex-1 flex items-center justify-center gap-2"
                        >
                            <FiShoppingBag /> Continue Shopping
                        </Link>
                    </div>
                </div>

                <p className="mt-8 text-gray-500 text-sm">
                    A confirmation email has been sent to your registered email address.
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
