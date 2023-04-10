function ShowTasks({ tasks }) {
    return (
      <div className="task-list">
        {tasks.map(({ id, date, startTime, endTime, reminder }) => (
          <div key={id} className="task-card">
            <h3>{date}</h3>
            <p>{startTime} - {endTime}</p>
            <p>{reminder}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default ShowTasks;
  