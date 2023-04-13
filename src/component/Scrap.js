import { useState } from 'react';

function Scrap({ tasks, onDelete, onUpdate }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    date: 'TBD',
    startTime: 'TBD',
    endTime: 'TBD',
    reminder: 'Random default'
  });
//\\* *//\\
  const handleDeleteTask = taskId => {
    onDelete(taskId);
  };

  const handleEditTask = taskId => {
    // 1. find by iterating and matching the of ID
    const taskToEdit = tasks.find(task => task.id === taskId);
    console.log(`handleEditTask => taskToEdit =>${tasks.find(task => task.id === taskId)}`)
    // 2. 
    setUpdatedTask({
      date: taskToEdit.date,
      startTime: taskToEdit.startTime,
      endTime: taskToEdit.endTime,
      reminder: taskToEdit.reminder
    });
    setEditingTaskId(taskId);
  };
  // async/await in this way ensures that the update operation completes before any subsequent code is executed
  const handleInputBlur = async (taskId) => {
    try {
      console.log("Updating task with id:", taskId);
      await onUpdate(taskId, updatedTask);
      console.log("Task updated successfully." , taskId, updatedTask);
      //Resets the SetEditTaskId
      setEditingTaskId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(`Input "${name}" changed to value:`, value, "Previous State:", updatedTask);
    setUpdatedTask((previousState) => ({
      ...previousState,
      //creates a key value pair because of the formatting in the JSON Object
      [name]: value
    }));
  };

  const handleCancel = () =>{
    // Set the Editing Task Id to nothing
    setEditingTaskId("")
  }

  return (
    <div className="task-list">
      {tasks.map(({ id, date, startTime, endTime, reminder }) => (
        <div key={id} className="task-card" onDoubleClick={() => handleEditTask(id)}>
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
               name='reminder'
                value={updatedTask.reminder}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur(id)}
                rows={3}
              />
                <button type="submit" 
                onClick={handleCancel}
                >
                  Cancel
                  </button>

            </>
          ) : (
            <>
              <div 
              onDoubleClick={() => handleEditTask(id)}>
                {date}
                </div>
              <div onDoubleClick={() => handleEditTask(id)}>
                {startTime}
                </div>
              <div onDoubleClick={() => handleEditTask(id)}>
                {endTime}
                </div>
              <div onDoubleClick={() => handleEditTask(id)}>
                {reminder}
                </div>
              <button onClick={() => handleDeleteTask(id)}>
                Delete
                </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Scrap;
