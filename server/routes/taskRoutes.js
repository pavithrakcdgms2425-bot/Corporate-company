const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const verifyToken = require("../middleware/authMiddleware");

// ======================
// Get All Tasks
// ======================
router.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================
// Add Task
// ======================
router.post("/", verifyToken, async (req, res) => {
  try {
    const task = new Task({
      text: req.body.text,
      completed: false,
      user: req.user.id,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================
// Update Task
// ======================
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.text = req.body.text ?? task.text;
    task.completed =
      req.body.completed ?? task.completed;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================
// Delete Task
// ======================
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;