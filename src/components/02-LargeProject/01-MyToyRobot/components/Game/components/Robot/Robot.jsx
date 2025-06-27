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

  const getArrowPosition = (face) => {
    switch (face) {
      case "North":
        return "absolute -top-6 left-1/2 transform -translate-x-1/2";
      case "South":
        return "absolute top-7 left-1/2 transform -translate-x-1/2";
      case "East":
        return "absolute top-1/3 left-7 transform -translate-y-1/2";
      case "West":
        return "absolute top-1/2 -left-5 transform -translate-y-1/2";
      default:
        return "absolute -top-6 left-1/2 transform -translate-x-1/2";
    }
  };

  const getRotation = (face) => {
    switch (face) {
      case "North":
        return "rotate-0";
      case "South":
        return "rotate-180";
      case "East":
        return "rotate-90";
      case "West":
        return "-rotate-90";
      default:
        return "rotate-0";
    }
  };

  return (
    <div
      style={{
        left: `${position.x * 60 + 45}px`, // 32px for axis labels + 12px to center in cell
        top: `${position.y * 60 + 45}px`,  // 32px for axis labels + 12px to center in cell
        zIndex: 20,
      }}
      className={`
        absolute
        text-2xl w-[36px] h-[36px] border border-transparent
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        ${isAnimating ? 'scale-110' : 'scale-100'}
      `}
    >
      <div className="relative">
        <span className={`w-[32px] h-[32px] bg-blue-500 rounded-full border-2 border-blue-700 flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 ${isAnimating ? 'bg-blue-600 scale-105' : ''}`}>
          <span className={`transform transition-transform duration-300 text-sm ${getRotation(position.face)}`}>
            🤖
          </span>
        </span>
        {/* <div className={getArrowPosition(position.face)}>
          <span className="text-lg font-bold text-blue-600">{getDirectionArrow(position.face)}</span>
        </div> */}
      </div>
    </div>
  );
};

export default Robot;
