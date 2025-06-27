import React from "react";
import Button from "./components/Button/Button";

const COMMANDS = [
  { id: 1, label: "Move" },
  { id: 2, label: "Left" },
  { id: 3, label: "Right" },
  { id: 4, label: "Report" },
];

const Commands = ({ onCommandClick, isPlaced }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-base font-semibold mb-3 text-gray-800">Robot Commands</h3>
      {!isPlaced && (
        <p className="text-orange-600 text-sm mb-4 p-2 bg-orange-50 border border-orange-200 rounded">
          ⚠️ Please place the robot on the board first!
        </p>
      )}
      <ul className="space-y-3">
        {COMMANDS.map((command) => (
          <li key={command.id}>
            <Button
              onClick={() => onCommandClick(command.label)}
              disabled={!isPlaced && command.label !== "Report"}
            >
              {command.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Commands;
