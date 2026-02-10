import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useCartContext from "../hooks/useCartContext";

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logoutUser } = useAuthContext();
  const { cart } = useCartContext();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container-professional flex justify-between items-center h-16">
        {/* Logo */}
        <Link to={user ? "/home" : "/"} className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">
            Swift<span className="text-blue-600">Cart</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to={user ? "/home" : "/"} className="link-clean font-medium">Home</Link>
          <Link to="/shop" className="link-clean font-medium">Shop</Link>
          <Link to="/about" className="link-clean font-medium">About</Link>
          <Link to="/contact" className="link-clean font-medium">Contact</Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600">
            <FiShoppingCart className="w-6 h-6" />
            {cart?.items?.length > 0 && (
              <span className="badge-subtle absolute -top-1 -right-1">
                {cart.items.length}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.first_name?.[0]?.toUpperCase() || <FiUser />}
                </div>
                <span className="font-medium text-gray-700 text-sm">{user.first_name}</span>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg shadow-lg border border-gray-200 w-52 p-2 mt-2">
                <li><Link to="/dashboard" className="text-gray-700 hover:bg-gray-100">Dashboard</Link></li>
                <li><Link to="/profile" className="text-gray-700 hover:bg-gray-100">Profile</Link></li>
                <li><button onClick={logoutUser} className="text-red-600 hover:bg-red-50 w-full text-left">Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="btn-professional">Register</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md">
          {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-200">
          <div className="flex flex-col space-y-3 px-4">
            <Link to={user ? "/home" : "/"} onClick={toggleMobileMenu} className="py-2 text-gray-700 hover:bg-gray-100 rounded-md">Home</Link>
            <Link to="/shop" onClick={toggleMobileMenu} className="py-2 text-gray-700 hover:bg-gray-100 rounded-md">Shop</Link>
            <Link to="/about" onClick={toggleMobileMenu} className="py-2 text-gray-700 hover:bg-gray-100 rounded-md">About</Link>
            <Link to="/contact" onClick={toggleMobileMenu} className="py-2 text-gray-700 hover:bg-gray-100 rounded-md">Contact</Link>

            {user ? (
              <>
                <Link to="/dashboard" onClick={toggleMobileMenu} className="py-2 text-gray-700 hover:bg-gray-100 rounded-md">Dashboard</Link>
                <Link to="/profile" onClick={toggleMobileMenu} className="py-2 text-gray-700 hover:bg-gray-100 rounded-md">Profile</Link>
                <button onClick={() => { logoutUser(); toggleMobileMenu(); }} className="py-2 text-red-600 hover:bg-red-50 rounded-md text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMobileMenu} className="py-2 text-gray-700 hover:bg-gray-100 rounded-md">Login</Link>
                <Link to="/register" onClick={toggleMobileMenu} className="py-2 bg-blue-600 text-white rounded-md text-center font-medium hover:bg-blue-700">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
