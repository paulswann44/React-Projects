import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [task, setTask] = useState({
    date: '',
    startTime: '',
    endTime: '',
    reminder: ''
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
  
    // split date into year, month, day
    const [year, month, day] = value.split('-');
    let formattedDate = task.date;
  
    // if both year and day are selected, format the date
    if (year && day) {
      const dateObj = new Date(year, month - 1, day);
      formattedDate = dateObj.toISOString().split('T')[0];
    }
  
    setTask((previousTask) => ({
      ...previousTask,
      [name]: value,
      date: formattedDate
    }));
  };
  
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Format the date
      const date = new Date(task.date).toISOString().split('T')[0];
  
      // Format the start and end times
      const startTime = new Date(`2000-01-01T${task.startTime}`);
      const endTime = new Date(`2000-01-01T${task.endTime}`);
      task.startTime = startTime.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: 'numeric' });
      task.endTime = endTime.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: 'numeric' });
  
      // Send the formatted task object to the onAddTask function
      await onAddTask({ ...task, date });
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
            min={today}
            max="2040-12-31"
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
