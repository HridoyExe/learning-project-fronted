import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from "react-icons/fi";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100 animate-scale-in">

                {/* Left Side: Contact Information */}
                <div className="w-full lg:w-5/12 bg-blue-600 p-10 lg:p-14 text-white relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                        backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')"
                    }}></div>

                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
                            <p className="text-blue-100 text-lg mb-12">
                                Have a question or feedback? We'd love to hear from you. Reach out and our team will get back to you within 24 hours.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FiPhone size={22} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-200">Phone Number</p>
                                        <p className="font-semibold text-lg">+880 1234 567890</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FiMail size={22} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-200">Email Address</p>
                                        <p className="font-semibold text-lg">support@phimart.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FiMapPin size={22} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-200">Our Location</p>
                                        <p className="font-semibold text-lg">Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-blue-500/30 flex items-center gap-3">
                            <FiClock className="text-blue-200" />
                            <span className="text-sm text-blue-100">Response time: &lt; 24 hours</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="w-full lg:w-7/12 p-10 lg:p-14">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label text-sm font-semibold text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    className="input-professional w-full"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label text-sm font-semibold text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    className="input-professional w-full"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-700">Subject</label>
                            <input
                                type="text"
                                className="input-professional w-full"
                                placeholder="How can we help?"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label text-sm font-semibold text-gray-700">Message</label>
                            <textarea
                                rows="5"
                                className="input-professional w-full resize-none p-4"
                                placeholder="Write your message here..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn-professional w-full flex items-center justify-center gap-3 py-4 text-lg group"
                        >
                            <span>Send Message</span>
                            <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        By submitting this form, you agree to our <span className="text-blue-600 font-medium cursor-pointer hover:underline">Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
