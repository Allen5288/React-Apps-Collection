import React from 'react';

const Block = ({ position }) => {
  return (
    <div
      style={{
        left: `${position.x * 60 + 12}px`, // 12px to center in cell (no axis offset needed as it's in Board)
        top: `${position.y * 60 + 12}px`,
        zIndex: 10,
      }}
      className="
        absolute
        w-[36px] h-[36px]
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        pointer-events-none
      "
    >
      <div className="w-[32px] h-[32px] bg-red-600 border-2 border-red-800 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-white text-sm font-bold">🧱</span>
      </div>
    </div>
  );
};

export default Block;
