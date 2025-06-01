import React from "react";
import Board from "./components/Board/Board";
import Robot from "./components/Robot/Robot";
import Commands from "./components/Commands/Commands";

const Game = () => {
  return (
    <main className="p-12 flex justify-between">
      <div className="relative">
        <div className="absolute">
          <Robot />
        </div>
        <Board />
      </div>
      <Commands />
    </main>
  );
};

export default Game;
