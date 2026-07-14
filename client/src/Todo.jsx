import { useState, useEffect } from "react";
import "./Todo.css";
import { motion, AnimatePresence } from "framer-motion";

import API from "./axios";

function Todo() {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);


  // Fetch tasks from MongoDB
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await API.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.log("Fetch Tasks Error:", error);
      }
    };

    fetchTasks();
  }, []);


  // Add Task
  const handleAdd = async () => {
    if (newTask.trim() === "") return;

    try {
      const response = await API.post("/tasks", {
        text: newTask,
      });

      setTasks([
        ...tasks,
        response.data,
      ]);

      setNewTask("");

    } catch (error) {
      console.log("Add Task Error:", error);
    }
  };


  // Delete Task
  const handleDelete = async (index) => {
    try {
      const taskId = tasks[index]._id;

      await API.delete(`/tasks/${taskId}`);

      setTasks(
        tasks.filter((_, i) => i !== index)
      );

    } catch (error) {
      console.log("Delete Task Error:", error);
    }
  };


  // Edit Task
  const handleEdit = (index) => {
    setNewTask(tasks[index].text);
    setEditIndex(index);
  };


  // Update Task
  const handleUpdate = async () => {
    try {
      const taskId = tasks[editIndex]._id;

      const response = await API.put(
        `/tasks/${taskId}`,
        {
          text: newTask,
        }
      );


      const updatedTasks = [...tasks];

      updatedTasks[editIndex] = response.data;

      setTasks(updatedTasks);

      setNewTask("");
      setEditIndex(null);

    } catch (error) {
      console.log("Update Task Error:", error);
    }
  };


  // Toggle Complete
  const toggleComplete = async (index) => {
    try {
      const task = tasks[index];

      const response = await API.put(
        `/tasks/${task._id}`,
        {
          completed: !task.completed,
        }
      );


      const updatedTasks = [...tasks];

      updatedTasks[index] = response.data;

      setTasks(updatedTasks);

    } catch (error) {
      console.log("Toggle Error:", error);
    }
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
              key={task._id}
              layout
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: 20,
                transition:{
                  duration:0.2
                }
              }}
              transition={{
                duration:0.3
              }}
            >


              <motion.p

                animate={{
                  color: task.completed
                    ? "#888"
                    : "#000",
                }}

                style={{
                  textDecoration:
                    task.completed
                    ? "line-through"
                    : "none",
                }}

                transition={{
                  duration:0.3
                }}

              >

                {task.text}

              </motion.p>



              <div>

                <motion.button

                  whileHover={{
                    scale:1.15
                  }}

                  whileTap={{
                    scale:0.9
                  }}

                  onClick={() =>
                    toggleComplete(index)
                  }

                >

                  {task.completed
                    ? "↩️"
                    : "✔️"}

                </motion.button>



                <motion.button

                  whileHover={{
                    scale:1.15
                  }}

                  whileTap={{
                    scale:0.9
                  }}

                  onClick={() =>
                    handleEdit(index)
                  }

                >

                  ✏️

                </motion.button>




                <motion.button

                  whileHover={{
                    scale:1.15
                  }}

                  whileTap={{
                    scale:0.9
                  }}

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
            initial={{
              opacity:0
            }}
            animate={{
              opacity:1
            }}
          >

            No tasks available.

          </motion.p>

        )}

      </AnimatePresence>


    </div>
  );
}


export default Todo;