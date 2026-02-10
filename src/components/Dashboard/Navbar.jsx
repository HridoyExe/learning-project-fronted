import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const Navbar = ({ sidebarOpen }) => {
  const { logoutUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 border-b px-4 sticky top-0 z-20">

      {/* Mobile toggle */}
      <div className="flex-none lg:hidden">
        <label htmlFor="drawer-toggle" className="btn btn-ghost btn-square">
          {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </label>
      </div>

      {/* Title */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold tracking-wide">Dashboard</h2>
      </div>

      {/* Profile */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li className="border-t mt-1 pt-1">
              <button
                onClick={handleLogout}
                className="text-error flex items-center gap-2"
              >
                <FiLogOut /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
