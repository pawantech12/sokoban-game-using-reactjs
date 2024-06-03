import React from "react";
import { FaPlay } from "react-icons/fa";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaInfo } from "react-icons/fa6";
const MenuScene = ({ switchScene }) => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl text-gray-800 font-semibold mb-8">Sokoban</h1>
      <img
        src="https://shahfahad.netlify.app/sokoban/images/player.png"
        alt="player-avatar"
        className="w-24 h-24 mb-8"
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <button
          className="hover:bg-blue-500 bg-blue-400 w-full justify-center text-white flex items-center gap-2 py-2 px-4 rounded-md font-medium"
          onClick={() => switchScene("play")}
        >
          <FaPlay /> Continue
        </button>
        <button
          className="hover:bg-blue-500 bg-blue-400 w-full justify-center text-white flex items-center gap-2 py-2 px-4 rounded-md font-medium"
          onClick={() => switchScene("level")}
        >
          <SiLevelsdotfyi />
          Level
        </button>
        <button
          className="hover:bg-blue-500 bg-blue-400 w-full justify-center text-white flex items-center gap-2 py-2 px-4 rounded-md font-medium"
          onClick={() => switchScene("about")}
        >
          <FaInfo /> About
        </button>
      </div>
    </section>
  );
};

export default MenuScene;
