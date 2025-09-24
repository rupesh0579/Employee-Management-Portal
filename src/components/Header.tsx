import * as React from "react";

interface HeaderProps {
  activeTab: "employees" | "reports";
  setActiveTab: (tab: "employees" | "reports") => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  // ✅ Get username from localStorage
  const username = localStorage.getItem("username") || "User";

  return (
    <header className="fixed top-0 left-0 right-0 z-10 px-12 py-4 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden md:block">
          Employee Portal
        </h1>

        <div className="flex gap-6 items-center">
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 font-medium border-b-2 cursor-pointer ${
                activeTab === "employees"
                  ? "border-purple-800 text-purple-800"
                  : "border-transparent text-gray-700 hover:border-gray-400 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("employees")}
            >
              👨‍💼 Employees
            </button>

            <button
              className={`px-4 py-2 font-medium border-b-2 cursor-pointer ${
                activeTab === "reports"
                  ? "border-purple-800 text-purple-800"
                  : "border-transparent text-gray-700 hover:border-gray-400 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("reports")}
            >
              📊 Reports
            </button>
          </div>
          <div>
             <span className="text-gray-950 dark:text-gray-300 font-medium hidden md:block">
            Welcome, {username}
          </span>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              localStorage.removeItem("username"); // ✅ Clear username on logout
              window.location.reload();
            }}
            className="py-1.5 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

