import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GameContext } from './GameContext';

const { width, height } = Dimensions.get('window');

const BoundaryManager = ({ position, onGameEnd }) => {
  const { setIsGameActive } = useContext(GameContext);
  const [boundary, setBoundary] = useState({ x: 100, y: 100, width: 200, height: 200 });

  useEffect(() => {
    const interval = setInterval(() => {
      setBoundary({
        x: Math.random() * (width - 200),
        y: Math.random() * (height - 200),
        width: 100 + Math.random() * 200,
        height: 100 + Math.random() * 200,
      });
    }, 5000); // Change shape every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const { x, y } = position;
    const { x: bx, y: by, width: bw, height: bh } = boundary;

    if (x >= bx && x <= bx + bw && y >= by && y <= by + bh) {
      setIsGameActive(true);
    } else {
      setIsGameActive(false);
      onGameEnd();
    }
  }, [position, boundary, setIsGameActive, onGameEnd]);

  return (
    <View
      style={[
        styles.boundary,
        {
          left: boundary.x,
          top: boundary.y,
          width: boundary.width,
          height: boundary.height,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  boundary: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'blue',
  },
});

export default BoundaryManager;
