import "./App.css";
import { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      isCompleted: !updatedTasks[index].isCompleted,
    };
    setTasks(updatedTasks);
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.isCompleted));
  };

  return (
    <div className="main_component">
      <div className="header">
        <h1>ToDo</h1>
      </div>
      <div className="main_body">
        <div className="input">
          <input
            type="text"
            value={newTask}
            onChange={handleInputChange}
            placeholder="What do you need to do?"
          />
          <button onClick={handleAddTask}>ADD</button>
        </div>
        <div className="tasklist">
          {tasks.map((task, index) => (
            <div key={index} className="task-item">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleTaskCompletion(index)}
              />
              <label>{task}</label>
            </div>
          ))}
          <button className="clear-completed" onClick={handleClearCompleted}>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
