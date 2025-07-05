import React, { useState } from 'react';
import './CounterApp.css';

function CounterApp() {
  const [count, setCount] = useState(0);
  
  const incrementCount = () => setCount(prevCount => prevCount + 1);
  const decrementCount = () => setCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
  const resetCount = () => setCount(0);
  
  return (
    <div className="counter-app-container">
      <h1>Counter Application</h1>
      <p className="counter-description">
        A simple counter application demonstrating React state management with useState hook.
      </p>
      
      <div className="counter-display">
        <span className="count-value">{count}</span>
      </div>
      
      <div className="counter-controls">
        <button 
          className="counter-button decrement"
          onClick={decrementCount}
          aria-label="Decrement count"
        >
          -
        </button>
        <button 
          className="counter-button reset"
          onClick={resetCount}
          aria-label="Reset count"
        >
          Reset
        </button>
        <button 
          className="counter-button increment"
          onClick={incrementCount}
          aria-label="Increment count"
        >
          +
        </button>
      </div>
      
      <div className="counter-implementation">
        <h2>Implementation Details</h2>
        <pre>
          <code>
{`// Counter Component Implementation
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  const incrementCount = () => setCount(prevCount => prevCount + 1);
  const decrementCount = () => setCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
  const resetCount = () => setCount(0);
  
  return (
    <div>
      <div>{count}</div>
      <button onClick={decrementCount}>-</button>
      <button onClick={resetCount}>Reset</button>
      <button onClick={incrementCount}>+</button>
    </div>
  );
}`}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default CounterApp;