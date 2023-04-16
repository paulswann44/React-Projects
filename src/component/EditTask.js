import { useState } from "react";

function EditTask({ task, onUpdateTask, onClose }) {
  const [text, setText] = useState(task.text);
  const [reminder, setReminder] = useState(task.reminder);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { ...task, text, reminder };
    onUpdateTask(task.id, updatedTask);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Text:
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <label>
        Reminder:
        <input type="text" value={reminder} onChange={(e) => setReminder(e.target.value)} />
      </label>
      <button type="submit">Update Task</button>
      <button onClick={onClose}>Cancel</button>
    </form>
  );
}

export default EditTask;
