import { useState } from 'react';
import moment from 'moment';
import EditTask from './EditTask';

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
                  <div>{moment(task.date).format('dddd')}</div>
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
                        <EditTask 
                          task={updatedTask}
                          onUpdateTask={handleSaveTask}
                          onCancelEdit={handleCancelEdit}
                          onChangeTask={(name, value) => setUpdatedTask((prev) => ({ ...prev, [name]: value }))}
                        />
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
  );
}

export default ShowTasks;
