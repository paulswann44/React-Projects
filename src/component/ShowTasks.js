// I want to include an UPDATE FEATURE that updates of a task. 
//  -- I need an put re

import { useState } from 'react';

function ShowTasks({ tasks, onDelete, onUpdate }) {

    //\\* useState -edit & update*//\\
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    date: '',
    startTime: '',
    endTime: '',
    reminder: ''
  });

    //\\* Connection to App.js*//\\
  const handleDeleteTask = taskId => {
    onDelete(taskId);
    console.log(`card with the id of ${taskId} was deleted`)
  };

  
  const handleEditTask = taskId => {
    setEditingTaskId(taskId);

    const task = tasks.find((task) => task.id === taskId);

    setUpdatedTask({
      date: task.date,
      startTime: task.startTime,
      endTime: task.endTime,
      reminder: task.reminder
    });
  };

  const handleSaveTask = async (taskId) => {
    try {
      await onUpdate(taskId, updatedTask);
      setEditingTaskId(null);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUpdatedTask((previousState) => ({
      ...previousState,
      [name]: value
    }));
  };

  const handleInputBlur = (taskId) => {
    handleSaveTask(taskId);
  }

// I have to states of editing my reminders: ?(1) Edit= true : (2) Edit= false
// 1. 
  return (
    <div className="task-list">
      {tasks.map(({ id, date, startTime, endTime, reminder }) => (
        <div key={id} className="task-card">
          {editingTaskId === id ? (
            <>
              <input
                type="date"
                name="date"
                value={updatedTask.date}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur(id)}
              />
              <input
                type="time"
                name="startTime"
                value={updatedTask.startTime}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur(id)}
              />
              <input
                type="time"
                name="endTime"
                value={updatedTask.endTime}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur(id)}
              />
                <textarea
                type="time"
                name="endTime"
                value={updatedTask.reminder}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur(id)}
              />
              <button onClick={() => handleSaveTask(id)}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{date}</h3>
              <p>
                {startTime} - {endTime}
              </p>
              <p>{reminder}</p>
              <button onClick={() => handleDeleteTask(id)}>Delete</button>
              <button onClick={() => handleEditTask(id)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ShowTasks;
