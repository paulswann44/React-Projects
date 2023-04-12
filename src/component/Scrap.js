import { useState, useEffect } from 'react';

function ShowTasks({ tasks, onDelete, onUpdate, taskToEdit }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    date: '',
    startTime: '',
    endTime: '',
    reminder: ''
  });

  useEffect(() => {
    if (taskToEdit) {
      setUpdatedTask(taskToEdit);
      setEditingTaskId(taskToEdit.id);
    }
  }, [taskToEdit]);

  const handleDeleteTask = taskId => {
    onDelete(taskId);
  };

  const handleInputBlur = async taskId => {
    try {
      console.log('Updating task with id:', taskId);
      await onUpdate(taskId, updatedTask);
      console.log('Task updated successfully.', taskId, updatedTask);
      setEditingTaskId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    console.log(`Input "${name}" changed to value:`, value);
    setUpdatedTask(previousState => ({
      ...previousState,
      [name]: value
    }));
  };

  return (
    <div className="task-list">
      {tasks.map(({ id, date, startTime, endTime, reminder }) => (
        <div key={id} className="task-card" onDoubleClick={() => setEditingTaskId(id)}>
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
            </>
          ) : (
            <>
              <h3>{date}</h3>
              <p>
                {startTime} - {endTime}
              </p>
              <p>{reminder}</p>
              <button onClick={() => handleDeleteTask(id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ShowTasks;
