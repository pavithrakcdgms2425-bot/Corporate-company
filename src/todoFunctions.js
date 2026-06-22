export const addTask = (tasks, newTask) => {
  if (newTask.trim() === "") return tasks;

  return [
    ...tasks,
    {
      text: newTask,
      completed: false,
    },
  ];
};

export const deleteTask = (tasks, index) => {
  return tasks.filter((_, i) => i !== index);
};

export const updateTask = (
  tasks,
  index,
  updatedTask
) => {
  const updatedTasks = [...tasks];

  updatedTasks[index] = {
    ...updatedTasks[index],
    text: updatedTask,
  };

  return updatedTasks;
};