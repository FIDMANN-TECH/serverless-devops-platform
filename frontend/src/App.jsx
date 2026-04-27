import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      setIsAuth(!!token);
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  // Prevent blank screen during initialization
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Loading application...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h1>🚀 Serverless DevOps Platform</h1>

        {isAuth && (
          <button className="btn logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>

      <main className="container">
        {isAuth ? (
          <Dashboard />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
}