import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const AboutScene = ({ switchScene }) => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <header className="bg-blue-500 p-4 w-full mb-4 flex px-8">
        <button
          className="border-2 border-white text-white py-2 px-4 rounded-md"
          onClick={() => switchScene("menu")}
        >
          <FaArrowLeftLong />
        </button>
        <div className="mx-auto text-center">
          <h2 className="text-white text-xl font-medium">Sokoban</h2>
          <small className="text-base text-gray-100">v1.0.0</small>
        </div>
      </header>
      <div className="h-3/4 w-full p-2 overflow-y-auto">
        <div className="border-2 border-slate-200 rounded-md p-4 mb-4">
          <h2 className="text-2xl mb-2 text-gray-600 font-medium">About</h2>
          <small className="text-base">
            This game was created by{" "}
            <a
              href="https://github.com/pawantech12/"
              className="text-blue-500 font-medium"
            >
              Pawan kumavat
            </a>{" "}
            on GitHub. More info about the history on Sokoban could be found on{" "}
            <a
              href="https://en.wikipedia.org/wiki/Sokoban"
              className="text-blue-500 font-medium"
            >
              wikipedia
            </a>
          </small>
        </div>
        <div className="border-2 border-slate-200 rounded-md p-4 mb-4">
          <h2 className="text-2xl mb-2 text-gray-600 font-medium">
            Playing Strategy
          </h2>
          <small className="text-base">
            Press the directional arrow keys on the screen or from the keyboard
            to let the worker move across the factory. If a crate is obstructing
            the worker's path, he will try to push it forward to the same
            direction. The worker and the crate cannot move through the block
            and your objective is to push each block to their respective
            destination
          </small>
        </div>
      </div>
    </section>
  );
};

export default AboutScene;
