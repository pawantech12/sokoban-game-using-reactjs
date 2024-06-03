import React, { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import MenuScene from "./components/MenuScene";
import PlayScene from "./components/PlayScene";
import LevelScene from "./components/LevelScene";
import AboutScene from "./components/AboutScene";

function App() {
  const [scene, setScene] = useState("preloader");
  const [level, setLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState([]);

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
    const savedCompletedLevels = localStorage.getItem("completedLevels");

    if (savedLevel) {
      setLevel(parseInt(savedLevel));
      setScene("play");
    } else {
      setScene("menu");
    }

    if (savedCompletedLevels) {
      setCompletedLevels(JSON.parse(savedCompletedLevels));
    }
  }, []);

  const switchScene = (newScene) => {
    setScene(newScene);
  };

  const handleLevelSelect = (selectedLevel) => {
    if (completedLevels.includes(selectedLevel - 1) || selectedLevel === 1) {
      setLevel(selectedLevel);
      setScene("play");
    }
  };

  const handleLevelComplete = (completedLevel) => {
    if (!completedLevels.includes(completedLevel)) {
      const newCompletedLevels = [...completedLevels, completedLevel];
      setCompletedLevels(newCompletedLevels);
      localStorage.setItem(
        "completedLevels",
        JSON.stringify(newCompletedLevels)
      );
    }
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
          onLevelComplete={handleLevelComplete}
        />
      )}
      {scene === "level" && (
        <LevelScene
          switchScene={switchScene}
          handleLevelSelect={handleLevelSelect}
          totalLevels={totalLevels}
          completedLevels={completedLevels}
        />
      )}
      {scene === "about" && <AboutScene switchScene={switchScene} />}
    </main>
  );
}

export default App;
