import { FaShoppingCart } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FaTags } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";

const Features = () => {
    const features = [
        {
            icon: <FaShoppingCart className="text-blue-600 text-3xl" />,
            title: "Free Delivery",
            description: "Get your orders delivered at no extra cost, fast and hassle-free.",
        },
        {
            icon: <MdVerified className="text-green-600 text-3xl" />,
            title: "Quality Guarantee",
            description: "We ensure top-notch quality for every product you purchase.",
        },
        {
            icon: <FaTags className="text-orange-600 text-3xl" />,
            title: "Daily Offers",
            description: "Exclusive discounts and special deals available every day.",
        },
        {
            icon: <BsShieldLock className="text-purple-600 text-3xl" />,
            title: "100% Secure Payment",
            description: "Your payment information is encrypted and completely secure.",
        },
    ];

    return (
        <section className="section-clean">
            <div className="container-professional">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="text-center p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
