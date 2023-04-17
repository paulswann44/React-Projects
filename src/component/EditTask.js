import { useState } from 'react';
import Modal from './Modal';

function EditTasks({ task, onSave, onCancel }) {
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await onSave(updatedTask);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal>
      <h2>Edit Task</h2>
      <form>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={updatedTask.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={updatedTask.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={updatedTask.startTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={updatedTask.endTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Reminder:</label>
          <input
            type="text"
            name="reminder"
            value={updatedTask.reminder}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </Modal>
  );
}

export default EditTasks;
