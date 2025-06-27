import React, { useState } from "react";
import Button from "../Commands/components/Button/Button";

const PlaceRobot = ({ onPlaceRobot, onReset }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [face, setFace] = useState("North");

  const directions = ["North", "East", "South", "West"];

  const handlePlace = () => {
    onPlaceRobot(x, y, face);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-base font-semibold mb-3 text-gray-800">Place Robot</h3>
      
      <div className="space-y-3">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">X:</label>
            <select 
              value={x} 
              onChange={(e) => setX(parseInt(e.target.value))}
              className="w-16 p-2 border border-gray-300 rounded text-center"
            >
              {[0, 1, 2, 3, 4].map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Y:</label>
            <select 
              value={y} 
              onChange={(e) => setY(parseInt(e.target.value))}
              className="w-16 p-2 border border-gray-300 rounded text-center"
            >
              {[0, 1, 2, 3, 4].map(val => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Face:</label>
            <select 
              value={face} 
              onChange={(e) => setFace(e.target.value)}
              className="w-20 p-2 border border-gray-300 rounded text-center"
            >
              {directions.map(dir => (
                <option key={dir} value={dir}>{dir}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handlePlace}>
            Place Robot
          </Button>
          <Button onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceRobot;
