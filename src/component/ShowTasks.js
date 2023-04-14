import { useState } from 'react';
import moment from 'moment';

function ShowTasks({ tasks, onDelete, onEdit }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState(null);

  // declare and initialize the filteredTasks variable
  const filteredTasks = {};
  tasks.forEach((task) => {
    const date = moment(task.date).format('MMMM D, YYYY');
    if (!filteredTasks[date]) {
      filteredTasks[date] = [];
    }
    filteredTasks[date].push(task);
  });

  const handleDeleteTask = (taskId) => {
    onDelete(taskId);
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setUpdatedTask({
      date: moment(taskToEdit.date).format('YYYY-MM-DD'),
      startTime: moment(taskToEdit.startTime, 'HH:mm:ss').format('HH:mm'),
      endTime: moment(taskToEdit.endTime, 'HH:mm:ss').format('HH:mm'),
      reminder: taskToEdit.reminder,
    });
    setEditingTaskId(taskId);
  };

  const handleSaveTask = async (taskId) => {
    try {
      console.log('Updating task with id:', taskId);
      await onEdit(taskId, updatedTask);
      console.log('Task updated successfully.', taskId, updatedTask);
      setEditingTaskId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setUpdatedTask(null);
  };

  return (
    <div>
      <h2>Task List</h2>
      {Object.keys(filteredTasks)
        .sort((a, b) => moment(a, 'MMMM D, YYYY') - moment(b, 'MMMM D, YYYY'))
        .map((date) => (
          <div key={date}>
            <h3>{date}</h3>
            <ul>
              {filteredTasks[date].map((task) => (
                <li key={task.id}>
                  <div>{task.description}</div>
                  <div>{moment(task.date).format('dddd, MMMM D')}</div>
                  <div>
                    {`${moment(task.startTime, 'HH:mm:ss').format('h:mm A')} - ${moment(
                      task.endTime,
                      'HH:mm:ss'
                    ).format('h:mm A')}`}
                  </div>
                  <div>{task.reminder}</div>
                  <div>
                    {editingTaskId === task.id ? (
                      <>
                        <input
                          type="date"
                          value={updatedTask.date}
                          onChange={(e) =>
                            setUpdatedTask((prev) => ({ ...prev, date: e.target.value }))
                          }
                        />
                        <input
                          type="time"
                          value={updatedTask.startTime}
                          onChange={(e) =>
                            setUpdatedTask((prev) => ({ ...prev, startTime: e.target.value }))
                          }
                        />
                        <input
                          type="time"
                          value={updatedTask.endTime}
                          onChange={(e) =>
                            setUpdatedTask((prev) => ({ ...prev, endTime: e.target.value }))
                          }
                        />
                        <input
                          type="text"
                          value={updatedTask.reminder}
                          onChange={(e) =>
                            setUpdatedTask((prev) => ({ ...prev, reminder: e.target.value }))
                          }
                        />
                        <button onClick={() => handleSaveTask(task.id)}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditTask(task.id)}>Edit</button>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  )};
  

  
  

export default ShowTasks;
  