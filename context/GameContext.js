import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isGameActive) {
      interval = setInterval(() => {
        setScore(prevScore => prevScore + 1);
      }, 1000); // Increment score every second
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isGameActive]);

  return (
    <GameContext.Provider value={{ score, setScore, isGameActive, setIsGameActive }}>
      {children}
    </GameContext.Provider>
  );
};
