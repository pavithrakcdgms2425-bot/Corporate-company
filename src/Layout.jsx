import { Outlet, useNavigate, useLocation, Navigate } from "react-router-dom";
import "./Dashboard.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = localStorage.getItem("userName") || "Employee";
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Guard: if nobody is actually signed in, bounce to Home instead of
  // rendering the sidebar/dashboard for an unauthenticated visitor.
  // (Redirects to "/" rather than "/signin" so this doesn't fight with
  // the explicit navigate("/") that handleLogout already triggers.)
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  // Helper: is this sidebar link the one matching the current URL?
  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <motion.aside
        className="sidebar"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.h2
          className="sidebar-logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          PaviTech
        </motion.h2>

        <ul className="sidebar-menu">
          <motion.li
            className={isActive("/dashboard") ? "active" : ""}
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/dashboard")}
          >
            🏠 Dashboard
          </motion.li>

          <motion.li
            className={isActive("/calendar") ? "active" : ""}
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/calendar")}
          >
            📅 Meetings
          </motion.li>

          <motion.li
            className={isActive("/tasks") ? "active" : ""}
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/tasks")}
          >
            ✅ Tasks
          </motion.li>

          <motion.li
            className={isActive("/employees") ? "active" : ""}
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/employees")}
          >
            👥 Employees
          </motion.li>

          <motion.li
            className={isActive("/analytics") ? "active" : ""}
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/analytics")}
          >
            📊 Analytics
          </motion.li>
        </ul>

        <motion.button
          className="logout-btn"
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </motion.aside>

      {/* Page Content - AnimatePresence + the pathname as key makes each
          tab (Dashboard / Tasks / Calendar / Employees / Analytics) fade
          + slide in whenever you switch between them in the sidebar */}
      <main className="dashboard-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
