import logo from "./assets/logo.png";
import illustration from "./assets/illustration.png";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Stagger container: children animate in one after another
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Each card fades up into place
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="brand">
          <img src={logo} alt="logo" className="logo" />
          <div>
            <h2>PaviTech Employee Hub</h2>
          </div>
        </div>

        <motion.button
          className="signin-btn"
          onClick={() => navigate("/signin")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign In
        </motion.button>
      </motion.header>

      <main className="hero">
        <motion.div
          className="tag"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          ✨ Smart Employee Management Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome to Pavi<span>Tech</span>
        </motion.h1>

        <div className="container">
          <motion.div
            className="class1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p>
              Empowering employees through productivity,
              collaboration and seamless workflow management.
            </p>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img src={illustration} alt="Corporate Illustration" />
          </motion.div>
        </div>

        <motion.button
          className="start-btn"
          onClick={() => navigate("/signup")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>

        <motion.div
          className="cards"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="card"
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.03 }}
          >
            <h3>📅 Meetings</h3>
            <p>Schedule and manage meetings.</p>
          </motion.div>

          <motion.div
            className="card"
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.03 }}
          >
            <h3>✅ Tasks</h3>
            <p>Organize your daily tasks.</p>
          </motion.div>

          <motion.div
            className="card"
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.03 }}
          >
            <h3>👥 Teams</h3>
            <p>Collaborate with your employees.</p>
          </motion.div>

          <motion.div
            className="card"
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.03 }}
          >
            <h3>📊 Analytics</h3>
            <p>Track productivity and progress.</p>
          </motion.div>
        </motion.div>
      </main>

      <footer className="footer">
        © 2026 PaviTech Solutions. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Home;
