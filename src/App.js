import axios from 'axios';
import { useEffect, useState } from 'react';
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
      setTasks((previousTasks) => [...previousTasks, response.data]);  
          //TODO: Add a model pop-up for success with setTimeout for 4s for success
    } catch (error) {
          //TODO: Add a model pop-up for success with setTimeout for 4s for success
      console.error(error);
    }
  }

    //\\* R - Read tasks*//\\
const getTasks= async()=>{
  try{
    const response= await axios.get(API);
    setTasks(response.data)
    //TODO: Add a model pop-up for success with setTimeout for 4s for success
  }catch(error){
    error.console(error)
    //TODO: Add a model pop-up for success with setTimeout for 4s for error
    alert(error.message);
  }
}

  //\\*useEffect - renders all the json including when it is updated*//\\
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
