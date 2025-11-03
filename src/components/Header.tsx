import * as React from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  onLogout: () => void;
  username: string;
}

const Header: React.FC<HeaderProps> = ({ onLogout, username }) => {
  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 py-4 px-12 flex items-center justify-between">
      <h2 className="text-3xl font-bold text-purple-900 hidden md:block">Employee Portal</h2>

      <nav className="flex items-center gap-6">
        <NavLink
          to="/employees"
          className={({ isActive }) =>
            isActive
              ? "text-purple-700 font-semibold underline-offset-8 underline"
              : "text-gray-700 hover:text-purple-700"
          }
        >
          Employees
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive
              ? "text-purple-700 font-semibold underline-offset-8 underline"
              : "text-gray-700 hover:text-purple-700"
          }
        >
          Reports
        </NavLink>

        <span className="text-gray-800 font-medium hidden md:block">
          Welcome, <span className="text-purple-800">{username}</span>
        </span>

        <button
          onClick={handleLogoutClick}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;