import { useEffect, useState } from 'react';
import moment from 'moment';
import TaskForm from './component/TaskForm';
import ShowTasks from './component/ShowTasks';
import { getAllTasks, createTask, updateTask, deleteTask } from './api/api';
import './style/form.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import SearchBar from './component/SearchBar';


function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // C - Create Task
  const handleAddTask = async (newTask) => {
    try {
      const response = await createTask(newTask);
      setTasks(previousTasks => [...previousTasks, response]);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  // R - Read Task
  const getTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error(`the error is ${error}`);
    }
  };

  // R - useEffect
  useEffect(() => {
    getTasks();
  }, []);

  // U - Update Task
  const handleEditTask = async (taskId, updatedTask) => {
    try {
      const response = await updateTask(taskId, updatedTask);
      setTasks(previousTasks => {
        const updatedTasks = previousTasks.map(task =>
          task.id === response.id ? response : task
        );
        return updatedTasks;
      });
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  // D - Delete task by ID
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(previousTasks =>
        previousTasks.filter(task => task.id !== taskId)
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  //F - Filter Task
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredTasks = tasks.filter(task => {
      const reminderDate = new Date(task.reminder).toDateString().toLowerCase();
      return (
        // TODO: Add start and endTime later
        // task.startTime.toLowerCase().includes(query) ||
        // task.endTime.toLowerCase().includes(query) ||
        task.reminder.toLowerCase().includes(query) ||
        reminderDate.includes(query)
      );
    });
    setFilteredTasks(filteredTasks);
  };
  

  return (
    <div className="App ">
            <SearchBar tasks={tasks} onSearch={handleSearch} />
      <TaskForm onAddTask={handleAddTask} />
      <ShowTasks
      task={filteredTasks.length > 0 ? filteredTasks : tasks}
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default App;
