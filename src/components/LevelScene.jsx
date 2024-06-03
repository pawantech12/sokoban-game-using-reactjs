import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const LevelScene = ({
  switchScene,
  handleLevelSelect,
  totalLevels,
  completedLevels,
  setCompletedLevels,
}) => {
  const levels = Array.from({ length: totalLevels }, (_, i) => i + 1);
  console.log("levels", levels);
  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <header className="bg-blue-500 p-4 px-8 flex justify-between w-full mb-4 items-center">
        <button
          className="border-2 border-white text-white py-2 px-4 rounded-md"
          onClick={() => switchScene("menu")}
        >
          <FaArrowLeftLong />
        </button>
        <h2 className="text-white text-xl font-medium">Select Level</h2>
        <button
          className="border-2 border-white text-white py-2 px-4 rounded-md"
          onClick={() => setCompletedLevels([])}
        >
          Reset Game
        </button>
      </header>
      <div className="flex flex-wrap gap-3 justify-center">
        {levels.map((level) => (
          <button
            key={level}
            className={`w-20 h-20 text-xl rounded-md ${
              completedLevels.includes(level)
                ? "bg-green-500 text-white"
                : "border-2 "
            }`}
            onClick={() => handleLevelSelect(level)}
          >
            {level}
          </button>
        ))}
      </div>
    </section>
  );
};

export default LevelScene;
