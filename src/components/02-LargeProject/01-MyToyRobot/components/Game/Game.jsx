import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import Robot from "./components/Robot/Robot";
import Commands from "./components/Commands/Commands";
import PlaceRobot from "./components/PlaceRobot/PlaceRobot";
import Instructions from "./components/Instructions/Instructions";
import BlockControls from "./components/BlockControls/BlockControls";

const MOVE = {
  North: { x: 0, y: -1 },
  South: { x: 0, y: 1 },
  East: { x: 1, y: 0 },
  West: { x: -1, y: 0 },
};

const DIRECTIONS = ["North", "East", "South", "West"];

const getNewDirection = (currentDirection, turn) => {
  const currentIndex = DIRECTIONS.indexOf(currentDirection);
  let newIndex;

  if (turn === "left") {
    newIndex = (currentIndex - 1 + DIRECTIONS.length) % DIRECTIONS.length;
  } else if (turn === "right") {
    newIndex = (currentIndex + 1) % DIRECTIONS.length;
  }

  return DIRECTIONS[newIndex];
};

const Game = () => {
  const [robotPositionOnBoard, setRobotPositionOnBoard] = useState({
    x: 0,
    y: 0,
    face: "North",
  });
  const [reportMessage, setReportMessage] = useState("");
  const [isPlaced, setIsPlaced] = useState(true);
  const [keyPressed, setKeyPressed] = useState(null);
  const [blocks, setBlocks] = useState([]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Prevent default behavior for arrow keys to avoid page scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) {
        event.preventDefault();
      }

      // Visual feedback for key press
      setKeyPressed(event.code);
      setTimeout(() => setKeyPressed(null), 200);

      if (!isPlaced) {
        setReportMessage("Robot is not placed on the board! Please place it first.");
        return;
      }

      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          handleMove();
          break;
        case 'ArrowLeft':
        case 'KeyA':
          handleTurn("left");
          break;
        case 'ArrowRight':
        case 'KeyD':
          handleTurn("right");
          break;
        case 'Space':
        case 'KeyR':
          handleReport();
          break;
        default:
          break;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPlaced, robotPositionOnBoard]); // Dependencies to ensure latest state

  const isValidPosition = (x, y) => {
    return x >= 0 && x < 5 && y >= 0 && y < 5;
  };

  const isBlockedPosition = (x, y) => {
    return blocks.some(block => block.x === x && block.y === y);
  };
  const handleCommand = (command) => {
    setReportMessage(""); // Clear previous report
    
    // Allow Report command even when robot is not placed
    if (command.toLowerCase() === "report") {
      handleReport();
      return;
    }
    
    // Check if robot is placed for other commands
    if (!isPlaced) {
      setReportMessage("Robot is not placed on the board! Please place it first.");
      return;
    }
    
    switch (command.toLowerCase()) {
      case "move":
        handleMove();
        break;
      case "left":
        handleTurn("left");
        break;
      case "right":
        handleTurn("right");
        break;
      default:
        console.log("Unknown command");
    }
  };

  const handleMove = () => {
    const movement = MOVE[robotPositionOnBoard.face];
    const newX = robotPositionOnBoard.x + movement.x;
    const newY = robotPositionOnBoard.y + movement.y;

    if (!isValidPosition(newX, newY)) {
      setReportMessage("Cannot move - robot would fall off the board!");
      return;
    }

    if (isBlockedPosition(newX, newY)) {
      setReportMessage("Cannot move - there's a block in the way!");
      return;
    }

    setRobotPositionOnBoard((prev) => ({
      ...prev,
      x: newX,
      y: newY,
    }));
  };

  const handleTurn = (direction) => {
    const newFace = getNewDirection(robotPositionOnBoard.face, direction);
    setRobotPositionOnBoard((prev) => ({
      ...prev,
      face: newFace,
    }));
  };

  const handleReport = () => {
    if (!isPlaced) {
      setReportMessage("Robot is not placed on the board!");
      return;
    }
    
    const { x, y, face } = robotPositionOnBoard;
    setReportMessage(`Robot is at position (${x}, ${y}) facing ${face}`);
  };

  const handlePlaceRobot = (x, y, face) => {
    if (!isValidPosition(x, y)) {
      setReportMessage("Invalid position! Please choose coordinates between 0-4.");
      return;
    }
    
    if (isBlockedPosition(x, y)) {
      setReportMessage("Cannot place robot - there's a block at that position!");
      return;
    }
    
    setRobotPositionOnBoard({ x, y, face });
    setIsPlaced(true);
    setReportMessage(`Robot placed at position (${x}, ${y}) facing ${face}`);
  };

  const handleAddBlock = () => {
    // Find all available positions (not occupied by robot or existing blocks)
    const availablePositions = [];
    
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        const isRobotPosition = isPlaced && robotPositionOnBoard.x === x && robotPositionOnBoard.y === y;
        const isBlockPosition = isBlockedPosition(x, y);
        
        if (!isRobotPosition && !isBlockPosition) {
          availablePositions.push({ x, y });
        }
      }
    }
    
    if (availablePositions.length === 0) {
      setReportMessage("Cannot add block - no available positions!");
      return;
    }
    
    // Randomly select a position
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    const newBlock = availablePositions[randomIndex];
    
    setBlocks(prev => [...prev, newBlock]);
    setReportMessage(`Block added at position (${newBlock.x}, ${newBlock.y})`);
  };

  const handleClearBlocks = () => {
    setBlocks([]);
    setReportMessage("All blocks cleared from the board!");
  };

  const handleReset = () => {
    setRobotPositionOnBoard({ x: 0, y: 0, face: "North" });
    setIsPlaced(false);
    setBlocks([]);
    setReportMessage("Robot removed from board and all blocks cleared. Please place the robot first.");
  };

  return (
    <main className="p-12 flex justify-between gap-8">
      <div className="relative">
        <Board blocks={blocks} />
        {isPlaced && <Robot position={robotPositionOnBoard} />}
        
        {/* Keyboard Status Indicator */}
        {keyPressed && (
          <div className="absolute top-0 right-0 bg-yellow-200 border border-yellow-400 px-3 py-1 rounded-lg shadow-lg" style={{ zIndex: 30 }}>
            <span className="text-yellow-800 text-sm font-medium">
              Key: {keyPressed.replace('Arrow', '').replace('Key', '')}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 w-80">
        {/* Keyboard Controls Status */}
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <span className="text-green-600">⌨️</span>
            <span className="text-green-800 font-medium text-sm">Keyboard Controls Active</span>
          </div>
          <div className="text-green-700 text-xs mt-1">
            Use Arrow Keys or WASD + Space/R
          </div>
        </div>
        
        <Instructions />
        <PlaceRobot onPlaceRobot={handlePlaceRobot} onReset={handleReset} />
        <BlockControls 
          onAddBlock={handleAddBlock} 
          onClearBlocks={handleClearBlocks} 
          blockCount={blocks.length}
        />
        <Commands onCommandClick={handleCommand} isPlaced={isPlaced} />
        {reportMessage && (
          <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-green-800 font-medium text-sm">{reportMessage}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Game;
