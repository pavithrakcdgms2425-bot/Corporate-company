import Todo from "./Todo";
import "./TasksPage.css";

function TasksPage() {
  return (
    <div className="tasks-page">
      <div className="tasks-container">
        <h1>✅ Task Manager</h1>
        <p>Organize and track your daily work efficiently.</p>

        <Todo />
      </div>
    </div>
  );
}

export default TasksPage;