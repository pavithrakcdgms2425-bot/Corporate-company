import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Home";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import TasksPage from "./TasksPage";
import CalendarPage from "./CalendarPage";
import Layout from "./Layout";
import EmployeePage from "./EmployeePage";
import Analytics from "./Analytics";
import NotFound from "./NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // `location` + `key` lets AnimatePresence detect when the route
  // changes so it can play an exit/enter transition between pages
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
        {/* Catch-all: any unknown route shows the animated 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
