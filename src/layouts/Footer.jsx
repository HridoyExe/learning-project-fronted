import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin, FiSend, FiArrowUp } from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#f8fafc] border-t border-gray-200 pt-20 pb-10">
      <div className="container-professional">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-black tracking-tighter text-gray-900">
                Swift<span className="text-blue-600">Cart</span>
              </span>
            </Link>
            <p className="text-gray-600 leading-relaxed max-w-sm">
              Experience the future of digital shopping. We curate only the best products to ensure quality and trust in every single click.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/about" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-md">
                Our Story
              </Link>
              <Link to="/contact" className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-bold hover:bg-gray-200 transition-all">
                Contact Us
              </Link>
            </div>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/share/17pejAngBy/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                <FiFacebook size={18} />
              </a>
              <a href="https://www.instagram.com/fardin_hridoy____?igsh=ejhwb3hmcXp0MWtj" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-pink-600 hover:text-white transition-all">
                <FiInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-blue-400 hover:text-white transition-all">
                <FiTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-blue-700 hover:text-white transition-all">
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-l-2 border-blue-600 pl-4">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/home" className="text-gray-600 hover:text-blue-600 transition-colors">Home Page</Link></li>
              <li><Link to="/shop" className="text-gray-600 hover:text-blue-600 transition-colors">Store/Shop</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">Brand Story</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Get Support</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-l-2 border-blue-600 pl-4">Care</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/orders" className="text-gray-600 hover:text-blue-600 transition-colors">Track Orders</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Use</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Engagement */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Join our community</h4>
              <p className="text-sm text-gray-500 mb-6">Get early access to exclusive drops and insider releases in your inbox.</p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all text-sm"
                />
                <button className="absolute right-2 top-1.5 bottom-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-lg transition-colors">
                  <FiSend size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Footer Bottom */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-2"><FiMapPin className="text-blue-600" /> Dhaka, BD</span>
            <span className="flex items-center gap-2"><FiPhone className="text-blue-600" /> (+880) 1234 567 890</span>
          </div>

          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} <span className="text-gray-900 font-bold">SwiftCart Corp</span>. All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
          >
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
