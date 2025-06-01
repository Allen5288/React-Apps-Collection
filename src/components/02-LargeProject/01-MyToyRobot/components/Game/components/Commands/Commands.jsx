import React from "react";
import Button from "./components/Button/Button";

const COMMANDS = [
  { id: 1, label: "Move" },
  { id: 2, label: "Left" },
  { id: 3, label: "Right" },
  { id: 4, label: "Report" },
];

const Commands = () => {
  return (
    <div>
      <ul className="space-y-4">
        {COMMANDS.map((command) => (
          <li key={command.id}>
            <Button>{command.label}</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Commands;