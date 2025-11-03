import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import EmployeesPage from "./pages/EmployeesPage";
import ReportsPage from "./pages/ReportsPage";
import Login from "./components/Login";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    sessionStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {isAuthenticated && <Header onLogout={handleLogout} username={"admin"} />}
        <main className={isAuthenticated ? "pt-24" : ""}>
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/employees" replace />} />
                <Route path="/employees" element={<EmployeesPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/login" element={<Navigate to="/employees" replace />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;