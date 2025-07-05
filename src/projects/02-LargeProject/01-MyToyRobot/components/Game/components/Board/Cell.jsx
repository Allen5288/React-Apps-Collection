import React from "react";

const Cell = ({x, y}) => {
  return (
    <div role="cell" aria-label={`${x}, ${y}`} className="w-[60px] h-[60px] border border-gray-400 bg-white hover:bg-gray-100 transition-colors"></div>
  );
};

export default Cell;
