import React, { useCallback, useState } from "react";
import { Level } from "./Level";
import { firstLevel } from "./constants";

export const Game: React.FC = () => {
  const [level, setLevel] = useState(firstLevel);

  const handleNextLevel = useCallback(() => {
    setLevel((level) => level + 1);
  }, []);

  // Key resets level state when level changes
  return <Level key={level} level={level} onNextLevel={handleNextLevel} />;
};
