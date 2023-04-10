import axios from 'axios';
import { useEffect, useState } from 'react';
// import './App.css';
import ShowTasks from './component/ShowTasks';
import TaskForm from './component/TaskForm';

const API = "http://localhost:3000/tasks";

function App() {
  //\\* useState* //\\
  const [tasks, setTasks] = useState([]);

  //\\* C - Create tasks*//\\
  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post(API, newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);  
    } catch (error) {
      console.error(error);
    }
  }

    //\\* R - Read tasks*//\\

const getTasks= async()=>{
  try{
    const response= await axios.get(API);
    setTasks(response.data)
  }catch(error){
    error.console(error)
    alert(error.message);
  }
}
  //\\*useEffect*//\\
useEffect(()=>{
  getTasks();
},[])

  //\\*HTML SECTION*//\\
  return (
    <div className="App">
      <TaskForm onAddTask={handleAddTask}/>  
      <ShowTasks tasks={tasks} />
    </div>
  );
}

export default App;
