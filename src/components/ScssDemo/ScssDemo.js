import React from "react";

const ScssDemo = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="card__header">
          <h2>SCSS Demo Component</h2>
        </div>
        <div className="card__body">
          <p>This component demonstrates the SCSS styles we've added to the project.</p>
          <p>The styles include variables, mixins, nesting, and other SCSS features.</p>
          
          <div style={{ marginTop: '20px' }}>
            <button className="btn btn-primary" style={{ marginRight: '10px' }}>
              Primary Button
            </button>
            <button className="btn btn-secondary">
              Secondary Button
            </button>
          </div>
        </div>
        <div className="card__footer">
          <p>You can now use SCSS in your project!</p>
        </div>
      </div>
    </div>
  );
};

export default ScssDemo;