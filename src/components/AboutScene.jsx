import React from "react";

const AboutScene = ({ switchScene }) => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <header className="bg-blue-500 p-4 w-full mb-4">
        <button
          className="btn btn-secondary"
          onClick={() => switchScene("menu")}
        >
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <div className="p-1 m-2">
          <h2 className="text-white">Sokoban</h2>
          <small className="text-xs text-gray-300">v1.0.0</small>
        </div>
      </header>
      <div className="h-3/4 w-full p-2 overflow-y-auto">
        <div className="border p-4 mb-4">
          <h2>About</h2>
          <small>
            This game was created by{" "}
            <a
              href="https://github.com/RuntimeTerror418/"
              className="text-blue-500"
            >
              Software Developer
            </a>{" "}
            on GitHub. More info about the history on Sokoban could be found on{" "}
            <a
              href="https://en.wikipedia.org/wiki/Sokoban"
              className="text-blue-500"
            >
              https://en.wikipedia.org/wiki/Sokoban
            </a>
          </small>
        </div>
        <div className="border p-4 mb-4">
          <h2>Playing Strategy</h2>
          <small>
            Press the directional arrow keys on the screen or from the keyboard
            to let the worker move across the factory. If a crate is obstructing
            the worker's path, he will try to push it forward to the same
            direction. The worker and the crate cannot move through the block
            and your objective is to push each block to their respective
            destination
          </small>
        </div>
        <div className="border p-4 mb-4">
          <h2>Credit</h2>
          <small>
            All sprites used in this program and some level information,
            specifically the game world without initial object placement has
            been obtained from
            <a
              href="https://code.sololearn.com/WItp1XM2DGFm/#"
              className="text-blue-500"
            >
              Sahad Fahad Sokoban
            </a>{" "}
            on Sololearn
          </small>
        </div>
        <div className="border p-4 mb-4">
          <h2>Contact</h2>
          <button className="btn btn-primary">
            <i className="fas fa-envelope text-gray-300"></i>{" "}
            <a href="mailto:ccosmos409@gmail.com" className="text-gray-300">
              Send Email
            </a>
          </button>
          <br />
        </div>
        <div className="border p-4 mb-4">
          <h2>Copyright</h2>
          <small>
            This software was released under the GNU General Public License on
            GitHub
            <a href="#2" className="text-blue-500">
              Empty link
            </a>
          </small>
        </div>
      </div>
    </section>
  );
};

export default AboutScene;
