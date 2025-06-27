import React from "react";
import Button from "../Commands/components/Button/Button";

const BlockControls = ({ onAddBlock, onClearBlocks, blockCount }) => {
  return (
    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
      <h3 className="text-base font-semibold mb-3 text-red-800">🧱 Block Controls</h3>
      
      <div className="space-y-3">
        <div className="text-red-700 text-sm">
          Current blocks: <span className="font-semibold">{blockCount}</span>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={onAddBlock}>
            Add Random Block
          </Button>
          <Button onClick={onClearBlocks}>
            Clear All Blocks
          </Button>
        </div>
        
        <div className="text-xs text-red-600 bg-red-100 p-2 rounded">
          💡 Blocks prevent the robot from moving to that position. 
          They are placed randomly on empty cells.
        </div>
      </div>
    </div>
  );
};

export default BlockControls;
