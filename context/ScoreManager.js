import React, { useContext, useEffect } from 'react';
import { GameContext } from './GameContext';

const ScoreManager = ({ data }) => {
  const { setScore } = useContext(GameContext);

  useEffect(() => {
    if (data) {
      setScore(prevScore => prevScore + 1);
    }
  }, [data, setScore]);

  return null; // This component doesn't render anything
};

export default ScoreManager;
