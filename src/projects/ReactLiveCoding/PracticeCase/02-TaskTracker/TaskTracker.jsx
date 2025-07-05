import React, { useState } from 'react';
import './TaskTracker.css';

function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  
  const addTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: taskInput, 
        completed: false 
      }]);
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
    <div className="task-tracker-container">
      <h1>Task Tracker</h1>
      <p className="task-tracker-description">
        A simple task tracker application demonstrating React state management with multiple items.
      </p>
      
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a new task..."
          className="task-input"
        />
        <button type="submit" className="add-task-button">Add Task</button>
      </form>
      
      <div className="task-stats">
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed: {tasks.filter(task => task.completed).length}</p>
        <p>Remaining: {tasks.filter(task => !task.completed).length}</p>
      </div>
      
      <div className="task-list-container">
        <h2>Your Tasks</h2>
        {tasks.length === 0 ? (
          <p className="no-tasks-message">No tasks yet. Add a task to get started!</p>
        ) : (
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="task-checkbox"
                  />
                  <span className="task-text">{task.text}</span>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="delete-task-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="task-tracker-implementation">
        <h2>Implementation Details</h2>
        <pre>
          <code>
{`// Task Tracker Implementation
import React, { useState } from 'react';

function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  
  const addTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: taskInput, 
        completed: false 
      }]);
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
    <div>
      <form onSubmit={addTask}>
        <input
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button type="submit">Add Task</button>
      </form>
      
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
            <input 
              type="checkbox" 
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default TaskTracker;