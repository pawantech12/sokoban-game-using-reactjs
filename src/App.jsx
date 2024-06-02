import React, { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import MenuScene from "./components/MenuScene";
import PlayScene from "./components/PlayScene";
import LevelScene from "./components/LevelScene";
import AboutScene from "./components/AboutScene";

function App() {
  const [scene, setScene] = useState("preloader");
  const [level, setLevel] = useState(1);
  const levelMaps = {
    1: [
      ["#", "#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", ".", "#"],
      ["#", ".", "#", "B", ".", "#"],
      ["#", ".", ".", "G", ".", "#"],
      ["#", "#", "#", "#", "#", "#"],
    ],
    2: [
      ["#", "#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", "G", "#"],
      ["#", ".", "#", "B", ".", "#"],
      ["#", ".", ".", ".", ".", "#"],
      ["#", "#", "#", "#", "#", "#"],
    ],
    3: [
      ["#", "#", "#", "#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", ".", ".", ".", "#"],
      ["#", ".", "#", "B", ".", ".", ".", "#"],
      ["#", ".", ".", "G", ".", ".", ".", "#"],
      ["#", ".", "#", ".", ".", "#", "#", "#"],
      ["#", ".", ".", ".", ".", ".", ".", "#"],
      ["#", "#", "#", "#", "#", "#", "#", "#"],
    ],
    4: [
      ["#", "#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", ".", "#"],
      ["#", ".", "#", "B", "#", "#"],
      ["#", ".", ".", "G", ".", "#"],
      ["#", "#", "#", "#", "#", "#"],
    ],
    5: [
      ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", ".", ".", ".", ".", "#"],
      ["#", ".", "#", "B", ".", "#", "#", "#", "#"],
      ["#", ".", ".", "G", ".", ".", ".", ".", "#"],
      ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ],
    6: [
      ["#", "#", "#", "#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", ".", ".", ".", "#"],
      ["#", ".", "#", "B", "#", ".", "#", "#"],
      ["#", ".", ".", "G", ".", ".", ".", "#"],
      ["#", "#", "#", "#", "#", "#", "#", "#"],
    ],
    7: [
      ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", ".", ".", ".", ".", "#"],
      ["#", ".", "#", "B", ".", "#", "#", "#", "#"],
      ["#", ".", ".", "G", ".", ".", ".", ".", "#"],
      ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ],
    8: [
      ["#", "#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", ".", "#"],
      ["#", "#", "#", "B", "#", "#"],
      ["#", ".", ".", "G", ".", "#"],
      ["#", "#", "#", "#", "#", "#"],
    ],
    9: [
      ["#", "#", "#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", ".", ".", "#"],
      ["#", "#", "#", "B", "#", ".", "#"],
      ["#", ".", ".", "G", ".", ".", "#"],
      ["#", "#", "#", "#", "#", "#", "#"],
    ],
    10: [
      ["#", "#", "#", "#", "#", "#", "#", "#"],
      ["#", ".", ".", ".", ".", ".", ".", "#"],
      ["#", ".", "#", "B", ".", "#", "#", "#"],
      ["#", ".", ".", "G", ".", ".", ".", "#"],
      ["#", "#", "#", "#", "#", "#", "#", "#"],
    ],
  };

  const [totalLevels, setTotalLevels] = useState(Object.keys(levelMaps).length);

  useEffect(() => {
    const savedLevel = localStorage.getItem("currentLevel");
    if (savedLevel) {
      setLevel(parseInt(savedLevel));
      setScene("play");
    } else {
      setScene("menu");
    }
  }, []);
  const switchScene = (newScene) => {
    setScene(newScene);
  };

  const handleLevelSelect = (selectedLevel) => {
    setLevel(selectedLevel);
    setScene("play");
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      {scene === "preloader" && <Preloader switchScene={switchScene} />}
      {scene === "menu" && <MenuScene switchScene={switchScene} />}
      {scene === "play" && (
        <PlayScene
          switchScene={switchScene}
          level={level}
          setTotalLevels={setTotalLevels}
          levelMaps={levelMaps}
        />
      )}
      {scene === "level" && (
        <LevelScene
          switchScene={switchScene}
          handleLevelSelect={handleLevelSelect}
          totalLevels={totalLevels}
        />
      )}
      {scene === "about" && <AboutScene switchScene={switchScene} />}
    </main>
  );
}

export default App;
