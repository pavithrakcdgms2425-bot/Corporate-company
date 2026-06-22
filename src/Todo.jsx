import { useState, useEffect } from "react";
import "./Todo.css";
import { motion, AnimatePresence } from "framer-motion";

import {
  addTask,
  deleteTask,
  updateTask,
} from "./todoFunctions";

function Todo() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks =
      localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });

  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] =
    useState(null);

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const handleAdd = () => {
    setTasks(addTask(tasks, newTask));
    setNewTask("");
  };

  const handleDelete = (index) => {
    setTasks(deleteTask(tasks, index));
  };

  const handleEdit = (index) => {
    setNewTask(tasks[index].text);
    setEditIndex(index);
  };

  const handleUpdate = () => {
    setTasks(
      updateTask(
        tasks,
        editIndex,
        newTask
      )
    );

    setNewTask("");
    setEditIndex(null);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];

    updatedTasks[index].completed =
      !updatedTasks[index].completed;

    setTasks(updatedTasks);
  };

  return (
    <div className="todo-card">
      <h2>✅ To-Do List</h2>

      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) =>
            setNewTask(e.target.value)
          }
        />

        {editIndex === null ? (
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add
          </motion.button>
        ) : (
          <motion.button
            onClick={handleUpdate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Update
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <motion.div
              className="task-item"
              key={task.id ?? `${task.text}-${index}`}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                animate={{
                  color: task.completed ? "#888" : "#000",
                }}
                style={{
                  textDecoration: task.completed
                    ? "line-through"
                    : "none",
                }}
                transition={{ duration: 0.3 }}
              >
                {task.text}
              </motion.p>

              <div>
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    toggleComplete(index)
                  }
                >
                  {task.completed
                    ? "↩️"
                    : "✔️"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    handleEdit(index)
                  }
                >
                  ✏️
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    handleDelete(index)
                  }
                >
                  🗑️
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            key="no-tasks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No tasks available.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Todo;
