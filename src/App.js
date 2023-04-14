import { useEffect, useState } from 'react';
import TaskForm from './component/TaskForm';
// import ShowTasks from './component/ShowTasks';
import Scrap from './component/Scrap';
import { getAllTasks, createTask, updateTask, deleteTask } from './api/api';

// const API = "http://localhost:3000/tasks/";

function App() {
  const [tasks, setTasks] = useState([]);

  //\\* C- Create Task *//\\
  const handleAddTask = async (newTask) => {
    try {
      const response = await createTask(newTask);
      setTasks((previousTasks) => [...previousTasks, response]);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  //\\* R- Read Task *//\\
  const getTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error(`the error is ${error}`);
    }
  };

  //\\* R - useEffect *//\\
  useEffect(() => {
    getTasks();
  }, []);

  //\\* U- Update Task *//\\
  const handleEditTask = async (taskId, updatedTask) => {
    try {
      const response = await updateTask(taskId, updatedTask);
      setTasks((previousTasks) => {
        const updatedTasks = previousTasks.map((task) => {
          if (task.id === response.id) {
            return response;
          } else {
            return task;
          }
        });
        return updatedTasks;
      });
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  // D - Delete task by ID \\
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((previousTasks) => previousTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <div className="App">
      <TaskForm onAddTask={handleAddTask} />
      {/* <ShowTasks tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} /> */}
      <Scrap tasks={tasks} onUpdate={handleEditTask} onDelete={handleDeleteTask} />

    </div>
  );
}

export default App;
