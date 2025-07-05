import React from "react";
import Placement from '../Placement/Placement';

const Goal = ({ position }) => {
  return (
    <Placement x={position.x} y={position.y} type="goal" style={{ zIndex: 18 }} alignToGrid={false}>
      <div aria-label="Goal" data-testid="goal" className="w-[32px] h-[32px] bg-yellow-400 rounded-full border-2 border-yellow-700 flex items-center justify-center text-white font-bold shadow-lg">
        <span className="text-lg">🏁</span>
      </div>
    </Placement>
  );
};

export default Goal;
