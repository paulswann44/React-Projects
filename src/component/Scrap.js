import { useState } from 'react';
import moment from 'moment';

function Scrap({ tasks, onDelete, onUpdate }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    date: moment().format('YYYY-MM-DD'),
    startTime: moment().format('HH:mm'),
    endTime: moment().format('HH:mm'),
    reminder: 'Random default'
  });

  const handleDeleteTask = taskId => {
    onDelete(taskId);
  };

  const handleEditTask = taskId => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setUpdatedTask({
      date: moment(taskToEdit.date).format('YYYY-MM-DD'),
      startTime: moment(taskToEdit.startTime, 'HH:mm:ss').format('HH:mm'),
      endTime: moment(taskToEdit.endTime, 'HH:mm:ss').format('HH:mm'),
      reminder: taskToEdit.reminder
    });
    setEditingTaskId(taskId);
  };

  const handleInputBlur = async (taskId) => {
    try {
      console.log("Updating task with id:", taskId);
      await onUpdate(taskId, updatedTask);
      console.log("Task updated successfully." , taskId, updatedTask);
      setEditingTaskId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTask((previousState) => ({
      ...previousState,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setEditingTaskId("");
  };

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
              <button type="submit" onClick={handleCancel}>
                Cancel
              </button>

            </>
          ) : (
            <>
              <div onDoubleClick={() => handleEditTask(id)}>
                {moment(date).format('MMM DD, YYYY')}
              </div>
              <div onDoubleClick={() => handleEditTask(id)}>
                {moment(startTime, 'HH:mm').format('hh:mm A')}
              </div>
              <div onDoubleClick={() => handleEditTask(id)}>
                {moment(endTime, 'HH:mm').format('hh:mm A')}
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