import React, { useState } from 'react';
import './ReactLiveCodingPractice.css';

function ReactLiveCodingPractice() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  
  // Counter functionality
  const incrementCount = () => setCount(prevCount => prevCount + 1);
  const decrementCount = () => setCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
  const resetCount = () => setCount(0);
  
  // Task functionality
  const addTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };
  
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  return (
    <div className="react-live-coding-container">
      <h1>React Live Coding Practice</h1>
      
      <section className="practice-section">
        <h2>1. Counter Component</h2>
        <div className="counter-container">
          <div className="counter-display">{count}</div>
          <div className="counter-controls">
            <button onClick={decrementCount}>-</button>
            <button onClick={resetCount}>Reset</button>
            <button onClick={incrementCount}>+</button>
          </div>
        </div>
      </section>
      
      <section className="practice-section">
        <h2>2. Task Tracker</h2>
        <form onSubmit={addTask} className="task-form">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task"
          />
          <button type="submit">Add</button>
        </form>
        
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <span 
                onClick={() => toggleTaskCompletion(task.id)}
                className="task-text"
              >
                {task.text}
              </span>
              <button 
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ReactLiveCodingPractice;