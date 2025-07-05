import React, { useState } from "react";

const Instructions = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
      <button 
        onClick={() => setIsVisible(!isVisible)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-lg font-semibold text-blue-800">
          📖 How to Use the Toy Robot
        </h3>
        <span className="text-blue-600">
          {isVisible ? '−' : '+'}
        </span>
      </button>
      
      {isVisible && (
        <div className="mt-3 text-sm text-blue-700 space-y-2">
          <div>
            <strong>🤖 Place Robot:</strong> Use the dropdowns to set initial position (X, Y) and facing direction.
          </div>
          <div>
            <strong>➡️ Move:</strong> Moves the robot one unit forward in the direction it's facing.
          </div>
          <div>
            <strong>↺ Left/Right:</strong> Rotates the robot 90 degrees left or right.
          </div>
          <div>
            <strong>📍 Report:</strong> Shows the robot's current position and direction.
          </div>
          <div>
            <strong>🧱 Blocks:</strong> Add random obstacles that the robot cannot move through.
          </div>
          
          <div className="bg-green-100 p-3 rounded mt-3 border border-green-200">
            <strong>⌨️ Keyboard Controls:</strong>
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              <div><kbd className="bg-white px-2 py-1 rounded border">↑</kbd> or <kbd className="bg-white px-2 py-1 rounded border">W</kbd> - Move</div>
              <div><kbd className="bg-white px-2 py-1 rounded border">←</kbd> or <kbd className="bg-white px-2 py-1 rounded border">A</kbd> - Turn Left</div>
              <div><kbd className="bg-white px-2 py-1 rounded border">→</kbd> or <kbd className="bg-white px-2 py-1 rounded border">D</kbd> - Turn Right</div>
              <div><kbd className="bg-white px-2 py-1 rounded border">Space</kbd> or <kbd className="bg-white px-2 py-1 rounded border">R</kbd> - Report</div>
            </div>
          </div>
          
          <div className="bg-blue-100 p-2 rounded mt-3">
            <strong>⚠️ Rules:</strong> The robot cannot move outside the 5×5 grid (coordinates 0-4).
            Commands are ignored if they would cause the robot to fall off the board or hit a block (🧱).
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructions;
