import React from 'react';
import Placement from '../Placement/Placement';

const Block = ({ position }) => {
  return (
    <Placement  x={position.x} y={position.y} type="block" style={{ zIndex: 10 }} axisOffset={false}>
      <div aria-label="block" className="w-[32px] h-[32px] bg-red-600 border-2 border-red-800 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-white text-sm font-bold">🧱</span>
      </div>
    </Placement>
  );
};

export default Block;
