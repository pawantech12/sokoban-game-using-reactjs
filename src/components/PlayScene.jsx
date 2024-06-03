import React, { useState, useEffect, useRef } from "react";
import crate from "../img/crate.png";
import ground from "../img/ground.png";
import player from "../img/player.png";
import point from "../img/point.png";
import wall from "../img/wall.png";
import outside from "../img/outside.png";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaUndo,
} from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiLoopRightLine } from "react-icons/ri";

const PlayScene = ({
  switchScene,
  level,
  setTotalLevels,
  levelMaps,
  onLevelComplete,
}) => {
  const [steps, setSteps] = useState(0);
  const canvasRef = useRef(null);

  const findInitialWorkerPosition = (map) => {
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === "worker") {
          return { x, y };
        }
      }
    }
    return { x: 1, y: 1 }; // Default position if not found
  };

  const initialPosition = findInitialWorkerPosition(levelMaps[level]);
  const [worker, setWorker] = useState(initialPosition);
  const [prevWorker, setPrevWorker] = useState(null);

  const [levelMap, setLevelMap] = useState(levelMaps[level]);
  const tileSize = 30;
  const [images, setImages] = useState({});
  const [currentLevel, setCurrentLevel] = useState(level);

  useEffect(() => {
    const imgSources = {
      "/": outside,
      "#": wall,
      ".": ground,
      B: crate,
      G: point,
      worker: player,
    };

    const loadImages = async () => {
      const loadedImages = {};
      for (const key in imgSources) {
        loadedImages[key] = new Image();
        loadedImages[key].src = imgSources[key];
        await new Promise((resolve) => {
          loadedImages[key].onload = resolve;
        });
      }
      setImages(loadedImages);
    };

    loadImages();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawLevel(ctx);
    // Add event listeners for arrow keys
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Remove event listeners on cleanup
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [worker, levelMap, images]);

  useEffect(() => {
    checkWinCondition();
  }, [worker, levelMap]);

  const drawLevel = (ctx) => {
    if (!Object.keys(images).length) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas before redraw
    levelMap.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (images[tile] !== images["worker"]) {
          ctx.drawImage(
            images[tile],
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize
          );
        } else {
          // Draw ground image if the tile is the worker's initial position
          ctx.drawImage(
            images["."],
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize
          );
        }
        if (x === worker.x && y === worker.y) {
          ctx.drawImage(
            images["worker"],
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize
          );
        }
      });
    });
  };

  const handleMove = (dx, dy) => {
    const newX = worker.x + dx;
    const newY = worker.y + dy;

    if (levelMap[newY][newX] !== "#" && levelMap[newY][newX] !== "B") {
      const newLevelMap = [...levelMap];
      newLevelMap[worker.y][worker.x] = "."; // Change the previous worker position to "."
      setPrevWorker(worker);
      setWorker({ x: newX, y: newY });
      setSteps(steps + 1);
      setLevelMap(newLevelMap);
    }
    // Logic to handle pushing the box
    else if (levelMap[newY][newX] === "B") {
      const nextX = newX + dx;
      const nextY = newY + dy;
      if (levelMap[nextY][nextX] === "." || levelMap[nextY][nextX] === "G") {
        const newLevelMap = [...levelMap];
        newLevelMap[worker.y][worker.x] = "."; // Change the previous worker position to "."
        newLevelMap[newY][newX] = ".";
        newLevelMap[nextY][nextX] = "B";
        setLevelMap(newLevelMap);
        setPrevWorker(worker);
        setWorker({ x: newX, y: newY });
        setSteps(steps + 1);
      }
    }
  };

  const resetToPreviousStep = () => {
    if (prevWorker) {
      setWorker(prevWorker);
      setPrevWorker(null);
      setSteps(steps - 1);
      drawLevel(canvasRef.current.getContext("2d")); // Redraw the level to update the tiles
    }
  };

  const checkWinCondition = () => {
    let isWin = true;
    for (let row of levelMap) {
      for (let cell of row) {
        if (cell === "G") {
          isWin = false;
          break;
        }
      }
      if (!isWin) break;
    }
    if (isWin) {
      setTimeout(() => {
        onLevelComplete(currentLevel);
        if (currentLevel + 1 in levelMaps) {
          setCurrentLevel(currentLevel + 1);
          setLevelMap(levelMaps[currentLevel + 1]);
          setWorker(findInitialWorkerPosition(levelMaps[currentLevel + 1]));
          setSteps(0);
        } else {
          switchScene("menu");
        }
      }, 1000); // 1-second delay before moving to the next level
    }
  };

  const resetLevel = () => {
    setWorker(findInitialWorkerPosition(levelMap));
    setPrevWorker(null);
    setSteps(0);
    drawLevel(canvasRef.current.getContext("2d")); // Redraw the level to update the tiles
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        handleMove(0, -1);
        break;
      case "ArrowDown":
        handleMove(0, 1);
        break;
      case "ArrowLeft":
        handleMove(-1, 0);
        break;
      case "ArrowRight":
        handleMove(1, 0);
        break;
      default:
        break;
    }
  };

  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-1/3 flex flex-col items-center">
        <header className="flex w-full items-center justify-between">
          <div className="flex gap-2">
            <button
              className="border-2 px-3 py-2 rounded-md border-slate-200"
              onClick={() => switchScene("menu")}
            >
              <FaArrowLeftLong />
            </button>
            <button
              className="border-2 px-3 py-2 rounded-md border-slate-200"
              onClick={resetLevel}
            >
              <RiLoopRightLine />
            </button>
            <button
              className="border-2 px-3 py-2 rounded-md border-slate-200"
              onClick={resetToPreviousStep}
            >
              <FaUndo />
            </button>
          </div>
          <div className="flex items-center font-medium space-x-4">
            <div className="text-gray-600 border-2 px-3 py-1 rounded-md border-slate-200  flex flex-col items-center">
              <span>Level:</span> {currentLevel}
            </div>
            <div className="text-gray-600 border-2 px-3 py-1 rounded-md border-slate-200 flex flex-col items-center">
              <span>Steps:</span> {steps}
            </div>
          </div>
        </header>
        <div className="my-3 relative flex flex-col items-center">
          <canvas ref={canvasRef} width="450" height="450"></canvas>
          <div className="absolute top-[105%] left-0 w-full h-40 flex flex-col items-center justify-center">
            <button
              className="absolute top-0 left-1/2 w-full border-2 border-slate-200 flex justify-center transform -translate-x-1/2 rounded-xl hover:bg-gray-100 p-4"
              onClick={() => handleMove(0, -1)}
            >
              <FaArrowUp />
            </button>

            <button
              className="absolute left-0 top-1/2 w-[48%] flex justify-center transform -translate-y-1/2 rounded-xl border-2 border-slate-200 hover:bg-gray-100 p-4"
              onClick={() => handleMove(-1, 0)}
            >
              <FaArrowLeft />
            </button>
            <button
              className="absolute right-0 top-1/2 w-[48%] flex justify-center transform -translate-y-1/2 rounded-xl border-2 border-slate-200 hover:bg-gray-100 p-4"
              onClick={() => handleMove(1, 0)}
            >
              <FaArrowRight />
            </button>

            <button
              className="absolute bottom-0 left-1/2 w-full flex justify-center transform -translate-x-1/2 rounded-xl border-2 border-slate-200 hover:bg-gray-100 p-4"
              onClick={() => handleMove(0, 1)}
            >
              <FaArrowDown />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayScene;
