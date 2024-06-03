import React from "react";

const LevelScene = ({
  switchScene,
  handleLevelSelect,
  totalLevels,
  completedLevels,
}) => {
  const levels = Array.from({ length: totalLevels }, (_, i) => i + 1);
  console.log("levels", levels);
  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <header className="bg-blue-500 p-4 w-full mb-4">
        <button
          className="btn btn-secondary"
          onClick={() => switchScene("menu")}
        >
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <h2 className="text-white">Select Level</h2>
      </header>
      <div className="flex flex-wrap justify-center">
        {levels.map((level) => (
          <button
            key={level}
            className={`btn m-2 ${
              completedLevels.includes(level) ? "bg-green-500" : "bg-yellow-500"
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
