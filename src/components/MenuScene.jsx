import React from "react";

const MenuScene = ({ switchScene }) => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl text-gray-800 mb-8">Sokoban</h1>
      <img
        src="https://shahfahad.netlify.app/sokoban/images/player.png"
        alt="player-avatar"
        className="w-24 h-24 mb-8"
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <button className="btn btn-info" onClick={() => switchScene("play")}>
          Continue
        </button>
        <button className="btn btn-info" onClick={() => switchScene("level")}>
          Level
        </button>
        <button className="btn btn-info" onClick={() => switchScene("about")}>
          About
        </button>
      </div>
    </section>
  );
};

export default MenuScene;
