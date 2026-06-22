import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Stagger container for the 4 stat cards
const statsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const statItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function Dashboard() {
  const userName =
    localStorage.getItem("userName") ||
    "Employee";

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const hour = new Date().getHours();

  let greeting = "Good Morning";

  if (hour >= 12 && hour < 18) {
    greeting = "Good Afternoon";
  } else if (hour >= 18) {
    greeting = "Good Evening";
  }

  const meetings =
    JSON.parse(
      localStorage.getItem("meetings")
    ) || {};

  const allMeetings = Object.entries(
    meetings
  ).flatMap(([date, meetingList]) =>
    meetingList.map((meeting) => ({
      ...meeting,
      date,
    }))
  );

  const upcomingMeetings =
    allMeetings
      .sort(
        (a, b) =>
          new Date(
            `${a.date}T${a.time}`
          ) -
          new Date(
            `${b.date}T${b.time}`
          )
      )
      .slice(0, 5);

  const tasks =
    JSON.parse(
      localStorage.getItem("tasks")
    ) || [];

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) => !task.completed
    ).length;

  const productivity =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks /
            tasks.length) *
            100
        );

  return (
    <>
      <motion.div
        className="top-bar"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <input
          type="text"
          placeholder="🔍 Search..."
          className="search-bar"
        />

        <motion.button
          className="logout-btn"
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>

        <div className="top-icons">
          <motion.span whileHover={{ rotate: 15, scale: 1.2 }} style={{ display: "inline-block" }}>
            🔔
          </motion.span>

          <span className="profile">
            👤 {userName}
          </span>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {greeting}, {userName} 👋
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {new Date().toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )}
      </motion.p>

      <motion.div
        className="stats-container"
        variants={statsContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="stat-card"
          variants={statItem}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -6, scale: 1.03 }}
        >
          <h3>📅 Total Meetings</h3>
          <p>{allMeetings.length}</p>
        </motion.div>

        <motion.div
          className="stat-card"
          variants={statItem}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -6, scale: 1.03 }}
        >
          <h3>⏳ Pending Tasks</h3>
          <p>{pendingTasks}</p>
        </motion.div>

        <motion.div
          className="stat-card"
          variants={statItem}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -6, scale: 1.03 }}
        >
          <h3>✔ Completed Tasks</h3>
          <p>{completedTasks}</p>
        </motion.div>

        <motion.div
          className="stat-card"
          variants={statItem}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -6, scale: 1.03 }}
        >
          <h3>📊 Productivity</h3>
          <p>{productivity}%</p>
        </motion.div>
      </motion.div>

      <div className="bottom-section">
        <motion.div
          className="meeting-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2>
            📅 Upcoming Meetings
          </h2>

          {upcomingMeetings.length >
          0 ? (
            upcomingMeetings.map(
              (
                meeting,
                index
              ) => (
                <motion.div
                  key={index}
                  className="meeting-item"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  whileHover={{ x: 4 }}
                >
                  <p>
                    📌{" "}
                    {meeting.title}
                  </p>

                  <small>
                    📅{" "}
                    {meeting.date}
                    {" | "}
                    🕒{" "}
                    {meeting.time}
                  </small>
                </motion.div>
              )
            )
          ) : (
            <p>
              No meetings
              scheduled.
            </p>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default Dashboard;
