import { useState } from 'react';


function TaskForm({ onAddTask }) {

    //\\* useState, but as an object* //\\
  const [task, setTask] = useState({
    date: '',
    startTime: '',
    endTime: '',
    reminder: ''
  });

      //\\* Form Change *//\\
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    console.log()
    setTask((previousTask) => ({ ...previousTask, [name]: value }));
  };


    //\\* Submit POST Functionality, but inheriting onAddTask property *//\\
  const handleFormSubmit = async (event) => {    
    event.preventDefault();
    try {
    //todo: set the default date today local
    const startTime = new Date(`2000-01-01T${task.startTime}`);
    const endTime = new Date(`2000-01-01T${task.endTime}`);
    task.startTime = startTime.toLocaleDateString([],{ hour12:true, hour: 'numeric', minute: 'numeric'});
    task.endTime = startTime.toLocaleDateString([],{ hour12:true, hour: 'numeric', minute: 'numeric'});


      await onAddTask(task);
      setTask({
        date: '',
        startTime: '',
        endTime: '',
        reminder: ''
      });
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  };

  const today = new Date().toISOString().split('T')[0];


    //\\* HTML SECTION *//\\
  return (
    <div className="task-form">
       <h2>Add a New Task</h2>
      <form onSubmit={handleFormSubmit}>
       <div className="form-group">
          <label htmlFor="date">Date</label>
           <input
             type="date"
             id="date"
             name="date"
            value={task.date}
            min={ today }
            max="2030-12-31"
           onChange={handleFormChange}
            required
           />
                    </div>
         <div className="form-group">
           <label htmlFor="start-time">Start Time</label>
           <input
             type="time"
             id="start-time"
             name="startTime"
            value={task.startTime}
             onChange={handleFormChange}
             required
           />
         </div>
         <div className="form-group">
           <label htmlFor="end-time">End Time</label>
           <input
            type="time"
            id="end-time"
            name="endTime"
            value={task.endTime}
             onChange={handleFormChange}
             required
           />
         </div>
         <div className="form-group">
           <label htmlFor="reminder">Reminder</label>
           <textarea
             id="reminder"
             name="reminder"
             value={task.reminder}
             onChange={handleFormChange}
            required
          ></textarea>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  
  );
}
export default TaskForm;