import React, { useState, useEffect, useRef } from "react";
import crate from "../img/crate.png";
import ground from "../img/ground.png";
import player from "../img/player.png";
import point from "../img/point.png";
import wall from "../img/wall.png";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaUndo,
} from "react-icons/fa";

const PlayScene = ({ switchScene, level, setTotalLevels, levelMaps }) => {
  const [steps, setSteps] = useState(0);
  const canvasRef = useRef(null);
  const [worker, setWorker] = useState({ x: 1, y: 1 });
  const [prevWorker, setPrevWorker] = useState(null);

  const [levelMap, setLevelMap] = useState(levelMaps[level]);
  const tileSize = 50;
  const [images, setImages] = useState({});
  const [currentLevel, setCurrentLevel] = useState(level);

  useEffect(() => {
    const imgSources = {
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
  }, [worker, levelMap, images]);

  useEffect(() => {
    checkWinCondition();
  }, [worker, levelMap]);

  const drawLevel = (ctx) => {
    if (!Object.keys(images).length) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas before redraw
    levelMap.forEach((row, y) => {
      row.forEach((tile, x) => {
        ctx.drawImage(
          images[tile],
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize
        );
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
      setPrevWorker(worker);
      setWorker({ x: newX, y: newY });
      setSteps(steps + 1);
    }
    // Logic to handle pushing the box
    else if (levelMap[newY][newX] === "B") {
      const nextX = newX + dx;
      const nextY = newY + dy;
      if (levelMap[nextY][nextX] === "." || levelMap[nextY][nextX] === "G") {
        const newLevelMap = [...levelMap];
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
        if (currentLevel + 1 in levelMaps) {
          setCurrentLevel(currentLevel + 1);
          setLevelMap(levelMaps[currentLevel + 1]);
          setWorker({ x: 1, y: 1 });
          setSteps(0);
        } else {
          switchScene("menu");
        }
      }, 1000); // 1-second delay before moving to the next level
    }
  };

  const resetLevel = () => {
    setWorker({ x: 1, y: 1 });
    setPrevWorker(null);
    setSteps(0);
  };

  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <header className="flex justify-between w-full mb-4">
        <button
          className="btn btn-secondary"
          onClick={() => switchScene("menu")}
        >
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <div className="flex items-center space-x-4">
          <div className="text-gray-800">
            <b>Level:</b> {currentLevel}
          </div>
          <div className="text-gray-800">
            <b>Steps:</b> {steps}
          </div>
        </div>
      </header>
      <div className="relative">
        <canvas ref={canvasRef} width="300" height="300"></canvas>
        <div className="absolute top-1/2 left-0 w-full h-full flex items-center justify-center">
          <button className="btn btn-primary" onClick={() => handleMove(0, -1)}>
            <FaArrowUp />
          </button>
          <div className="flex justify-center">
            <button
              className="btn btn-primary mr-2"
              onClick={() => handleMove(-1, 0)}
            >
              <FaArrowLeft />
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleMove(1, 0)}
            >
              <FaArrowRight />
            </button>
          </div>
          <button className="btn btn-primary" onClick={() => handleMove(0, 1)}>
            <FaArrowDown />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <button className="btn btn-danger" onClick={resetLevel}>
          Reset Level
        </button>
        <button
          className="btn btn-secondary ml-2"
          onClick={resetToPreviousStep}
        >
          <FaUndo /> Undo
        </button>
      </div>
    </section>
  );
};

export default PlayScene;
