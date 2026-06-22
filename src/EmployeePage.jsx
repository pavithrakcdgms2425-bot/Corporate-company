import "./EmployeePage.css";
import profileImage from "./assets/profile-icon.png";
import { motion } from "framer-motion";

// Stagger container for the 4 info cards
const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function EmployeePage() {
  const userName =
    localStorage.getItem("userName") ||
    "Pavithra K";

  return (
    <div className="employee-page">
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        👥 Employee Profile
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Welcome, {userName}! 👋
      </motion.h2>

      <motion.div
        className="details-grid"
        variants={gridContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Employee Information */}
        <motion.div
          className="info-card"
          variants={cardItem}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -6 }}
        >
          <h3>Employee Information</h3>

          <div className="profile-avatar">
            <motion.img
              src={profileImage}
              alt="Profile"
              initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.2 }}
            />
          </div>

          <p>
            <strong>ID:</strong> EMP001
          </p>

          <p>
            <strong>Role:</strong> Frontend Developer
          </p>

          <p>
            <strong>Department:</strong> Engineering
          </p>

          <p>
            <strong>Location:</strong> Chennai
          </p>
        </motion.div>

        {/* Employment Details */}
        <motion.div
          className="info-card"
          variants={cardItem}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -6 }}
        >
          <h3>📅 Employment Details</h3>

          <p>
            <strong>Joining Date:</strong> 15 Jun 2026
          </p>

          <p>
            <strong>Experience:</strong> 1 Year
          </p>

          <p>
            <strong>Manager:</strong> Sarah Johnson
          </p>

          <p>
            <strong>Shift:</strong> General Shift
          </p>
        </motion.div>

        {/* Performance */}
        <motion.div
          className="info-card"
          variants={cardItem}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -6 }}
        >
          <h3>🏆 Performance Summary</h3>

          <p>
            <strong>Attendance:</strong> 96%
          </p>

          <p>
            <strong>Tasks Completed:</strong> 48
          </p>

          <p>
            <strong>Meetings Attended:</strong> 32
          </p>

          <p>
            <strong>Status:</strong> Active
          </p>
        </motion.div>

        {/* Company Info */}
        <motion.div
          className="info-card"
          variants={cardItem}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -6 }}
        >
          <h3>🏢 Company Overview</h3>

          <p>
            <strong>Total Employees:</strong> 125
          </p>

          <p>
            <strong>Office:</strong> Chennai
          </p>

          <p>
            <strong>Work Mode:</strong> Hybrid
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default EmployeePage;
