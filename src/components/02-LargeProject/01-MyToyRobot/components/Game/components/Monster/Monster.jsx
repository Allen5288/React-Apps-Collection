import React from "react";
import Placement from '../Placement/Placement';

const Monster = ({ position }) => {
  return (
    <Placement x={position.x} y={position.y} type="monster" style={{ zIndex: 19 }} alignToGrid={false}>
      <div aria-label="Monster" data-testid="monster" className="w-[32px] h-[32px] bg-purple-600 rounded-full border-2 border-purple-800 flex items-center justify-center text-white font-bold shadow-lg">
        <span className="text-lg">👾</span>
      </div>
    </Placement>
  );
};

export default Monster;
