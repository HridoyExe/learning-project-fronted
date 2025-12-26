import { Link } from "react-router-dom";
import { FiBarChart2, FiPackage, FiPlusCircle, FiShoppingCart, FiStar, FiTag, FiUsers } from "react-icons/fi";

const Sidebar = () => {
    const menuItems = [
        { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
        { to: "/products", icon: FiPackage, label: "Products" },
        { to: "/products/add", icon: FiPlusCircle, label: "Add Product" },
        { to: "/categories", icon: FiTag, label: "Categories" },
        { to: "/categories/add", icon: FiPlusCircle, label: "Add Category" },
        { to: "/orders", icon: FiShoppingCart, label: "Orders" },
        { to: "/reviews", icon: FiStar, label: "Reviews" },
        { to: "/users", icon: FiUsers, label: "Users" },
    ];

    return (
        <div className="drawer-side z-10">
            <label
                htmlFor="drawer-toggle"
                aria-label="close sidebar"
                className="drawer-overlay"
            ></label>
            <aside className="menu bg-base-200 w-64 min-h-full p-4 text-base-content flex flex-col">
                {/* Sidebar header */}
                <div className="flex items-center gap-2 mb-6 px-2">
                    <FiShoppingCart className="h-6 w-6" />
                    <h1 className="text-xl font-bold">PhiMart</h1>
                </div>

                {/* Sidebar menu */}
                <ul className="menu menu-md gap-2 flex-1">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.to} className="flex items-center">
                                <item.icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Sidebar footer */}
                <div className="pt-6 text-xs text-base-content/70">
                    © 2025 PhiMart Admin
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
