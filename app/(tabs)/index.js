import React, { useState, useEffect } from 'react';
import StackNavigator from '../StackNavigator';

export default function App() {
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isGameActive) {
      interval = setInterval(() => {
        setScore((prevScore) => prevScore + 1);
      }, 1000); // Increment score every second
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isGameActive]);

  return (
    <StackNavigator
      score={score}
      setScore={setScore}
      isGameActive={isGameActive}
      setIsGameActive={setIsGameActive}
    />
  );
}
