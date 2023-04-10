  function ShowTasks({ tasks, onDelete }) {
    const handleDeleteTask = (taskId) => {
      onDelete(taskId);
    };
  
    return (
      <div className="task-list">
        {tasks.map(({ id, date, startTime, endTime, reminder }) => (
          <div key={id} className="task-card">
            <h3>{date}</h3>
            <p>
              {startTime} - {endTime}
            </p>
            <p>{reminder}</p>
            <button onClick={() => handleDeleteTask(id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }
  
  export default ShowTasks;
  
  