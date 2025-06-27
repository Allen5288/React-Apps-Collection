import React, { useState, useEffect } from "react";

const Robot = ({ position }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation when position changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [position.x, position.y, position.face]);
  const getDirectionArrow = (face) => {
    switch (face) {
      case "North":
        return "↑";
      case "South":
        return "↓";
      case "East":
        return "→";
      case "West":
        return "←";
      default:
        return "↑";
    }
  };

  const getRotation = (face) => {
    switch (face) {
      case "North":
        return "rotate-0";
      case "East":
        return "rotate-90";
      case "South":
        return "rotate-180";
      case "West":
        return "rotate-270";
      default:
        return "rotate-0";
    }
  };

  return (
    <div
      style={{
        left: `${position.x * 60}px`,
        top: `${position.y * 60}px`,
      }}
      className={`
        absolute
        text-2xl h-[60px] w-[60px] border border-transparent
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        ${isAnimating ? 'scale-110' : 'scale-100'}
      `}
    >
      <div className="relative">
        <span className={`w-[40px] h-[40px] bg-blue-500 rounded-full border-2 border-blue-700 flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 ${isAnimating ? 'bg-blue-600 scale-105' : ''}`}>
          <span className={`transform transition-transform duration-300 ${getRotation(position.face)}`}>
            🤖
          </span>
        </span>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <span className="text-2xl">{getDirectionArrow(position.face)}</span>
        </div>
      </div>
    </div>
  );
};

export default Robot;
