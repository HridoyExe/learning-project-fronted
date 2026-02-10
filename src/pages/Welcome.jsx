import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowRight, FiShoppingBag, FiShield, FiZap } from "react-icons/fi";
import useAuthContext from "../hooks/useAuthContext";

const Welcome = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        // If already logged in, redirect to home
        if (user) {
            const timer = setTimeout(() => {
                navigate("/home"); // We will rename the current index to /home or handle it
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

            <div className={`max-w-4xl px-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                {/* Logo/Icon Animation */}
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl animate-bounce">
                        <FiShoppingBag size={40} />
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                    Welcome to <span className="text-blue-600">SwiftCart</span>
                </h1>

                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-blur-fade">
                    Your premier destination for high-quality products. Experience shopping like never before with our curated collections and seamless service.
                </p>

                {!user ? (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
                        <Link
                            to="/login"
                            className="btn-professional flex items-center gap-2 text-lg px-8 py-4 w-full sm:w-auto"
                        >
                            Sign In to Explore <FiArrowRight />
                        </Link>
                        <Link
                            to="/register"
                            className="px-8 py-4 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all w-full sm:w-auto"
                        >
                            Create Account
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 animate-slide-up">
                        <p className="text-lg font-medium text-blue-600 mb-2">Authenticated. Redirecting you home...</p>
                        <div className="loading loading-spinner loading-lg text-blue-600"></div>
                    </div>
                )}

                {/* Features Grid */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-blue-600 mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <FiShield size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Secure Shopping</h3>
                        <p className="text-sm text-gray-500">Your data and transactions are protected with enterprise-grade security.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-blue-600 mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <FiZap size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
                        <p className="text-sm text-gray-500">Get your products delivered to your doorstep in record time.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-blue-600 mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <FiShoppingBag size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Premium Quality</h3>
                        <p className="text-sm text-gray-500">We only source products from top-tier brands and manufacturers.</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 left-0 w-full text-center text-gray-400 text-sm">
                &copy; 2026 SwiftCart. All Rights Reserved.
            </div>
        </div>
    );
};

export default Welcome;
