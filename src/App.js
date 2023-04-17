import React, { useState, useEffect } from "react";
import "./App.css";
import TaskList from "./component/ShowTasks";
import SearchBar from "./component/SearchBar";
import TaskForm from "./component/TaskForm";
import { getAllTasks, createTask, updateTask, deleteTask, fetchData } from "./api/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  // R - Read Task
  const getTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error(`the error is ${error}`);
    }
  };

  // C - Create Task
  const addTask = async (task) => {
    try {
      const newTask = await createTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error(`the error is ${error}`);
    }
  };

  // U - Update Task
  const updateTaskStatus = async (id) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      const updatedTask = await updateTask(id, { ...taskToUpdate, reminder: !taskToUpdate.reminder });
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error(`the error is ${error}`);
    }
  };

  // D - Delete Task
  const deleteTaskById = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(`the error is ${error}`);
    }
  };

  // R - useEffect
  useEffect(() => {
    getTasks();
  }, []);

  // handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchData(searchQuery, searchDate);
      setFilteredTasks(data);
    } catch (error) {
      console.error(`the error is ${error}`);
    }
  };

  // filter tasks based on search query and date
  useEffect(() => {
    const filtered = tasks.filter(
      (task) =>
        task.reminder.toLowerCase().includes(searchQuery.toLowerCase()) &&
        task.date.includes(searchDate)
    );
    setFilteredTasks(filtered);
  }, [tasks, searchQuery, searchDate]);

  return (
    <div className="container">
      <h1>Task Tracker</h1>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchDate={searchDate}
        setSearchDate={setSearchDate}
        onSearch={handleSearch}
      />
      <TaskForm onAdd={addTask} />
      <TaskList tasks={filteredTasks} onUpdate={updateTaskStatus} onDelete={deleteTaskById} />
    </div>
  );
}

export default App;
