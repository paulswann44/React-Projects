import axios from 'axios';
import { useEffect, useState } from 'react';
import TaskForm from './component/TaskForm';
import ShowTasks from './component/ShowTasks';
import Scrap from './component/Scrap';

const API = "http://localhost:3000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  //\\* C- Create Task *//\\
  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post(API, newTask);
      setTasks((previousTasks) => [...previousTasks, response.data]);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  //\\* R- Read Task *//\\
  const getTasks = async () => {
    try {
      const response = await axios.get(API);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //\\* R - useEffect *//\\
  useEffect(() => {
    getTasks();
  }, []);

  //\\* U- Update Task *//\\
  const handleEditTask = async (updatedTask) => {
    try {
      const response = await axios.put(`${API}/${updatedTask.id}`, updatedTask);
      setTasks((previousTasks) => {
        const updatedTasks = previousTasks.map((task) => {
          if (task.id === response.data.id) {
            return response.data;
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
      await axios.delete(`${API}/${taskId}`);
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
      <Scrap tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </div>
  );
}

export default App;
