import { Link, useLocation } from "react-router-dom";
import {
  FiBarChart2,
  FiPackage,
  FiPlusCircle,
  FiShoppingCart,
  FiStar,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { MdShoppingCart } from "react-icons/md";
import useAuthContext from "../../hooks/useAuthContext";

const Sidebar = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  const menus = user?.is_staff
    ? [
      { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
      { to: "/profile", icon: FiUsers, label: "Profile" },
      { to: "/dashboard/products/add", icon: FiPlusCircle, label: "Add Product" },
      { to: "/dashboard/cart", icon: MdShoppingCart, label: "My Cart" },
      { to: "/dashboard/orders", icon: FiShoppingCart, label: "My Orders" },
      // { to: "/products", icon: FiPackage, label: "Products" }, // Pending implementation
      // { to: "/categories", icon: FiTag, label: "Categories" }, // Pending implementation
      // { to: "/users", icon: FiUsers, label: "Users" }, // Pending implementation
    ]
    : [
      { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
      { to: "/profile", icon: FiUsers, label: "Profile" },
      { to: "/dashboard/orders", icon: FiShoppingCart, label: "My Orders" },
      { to: "/dashboard/cart", icon: MdShoppingCart, label: "My Cart" },
    ];

  return (
    <div className="drawer-side z-10">
      <label htmlFor="drawer-toggle" className="drawer-overlay"></label>

      <aside className="w-64 bg-base-200 min-h-full flex flex-col border-r">
        {/* Brand */}
        <Link to="/" className="px-6 py-5 flex items-center gap-2 border-b">
          <FiShoppingCart size={22} />
          <span className="text-xl font-bold">SwiftCart</span>
        </Link>

        {/* Menu */}
        <ul className="menu px-4 py-4 gap-1 flex-1">
          {menus.map((item, i) => {
            const active = location.pathname === item.to;
            return (
              <li key={i}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 rounded-lg ${active
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-300"
                    }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="px-6 py-4 text-xs text-base-content/60 border-t">
          © 2025 SwiftCart
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
