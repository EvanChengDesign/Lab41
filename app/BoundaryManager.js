import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const BoundaryManager = ({ position, onGameEnd, setIsGameActive }) => {
  const boundaryX = useState(new Animated.Value(50))[0];
  const boundaryY = useState(new Animated.Value(50))[0];
  const boundaryWidth = useState(new Animated.Value(width - 100))[0];
  const boundaryHeight = useState(new Animated.Value(height - 100))[0];

  useEffect(() => {
    const interval = setInterval(() => {
      const newBoundary = {
        x: Math.random() * (width - 100),
        y: Math.random() * (height - 100),
        width: 100 + Math.random() * (width - 100),
        height: 100 + Math.random() * (height - 100),
      };

      Animated.timing(boundaryX, {
        toValue: newBoundary.x,
        duration: 2000, // Smooth transition over 2 seconds
        useNativeDriver: false,
      }).start();

      Animated.timing(boundaryY, {
        toValue: newBoundary.y,
        duration: 2000, // Smooth transition over 2 seconds
        useNativeDriver: false,
      }).start();

      Animated.timing(boundaryWidth, {
        toValue: newBoundary.width,
        duration: 2000, // Smooth transition over 2 seconds
        useNativeDriver: false,
      }).start();

      Animated.timing(boundaryHeight, {
        toValue: newBoundary.height,
        duration: 2000, // Smooth transition over 2 seconds
        useNativeDriver: false,
      }).start();

      console.log('Boundary updated:', newBoundary);
    }, 5000); // Change shape every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const { x, y } = position;

    const bx = boundaryX._value;
    const by = boundaryY._value;
    const bw = boundaryWidth._value;
    const bh = boundaryHeight._value;

    console.log('Position:', position);
    console.log('Boundary:', { bx, by, bw, bh });

    if (x >= bx && x <= bx + bw && y >= by && y <= by + bh) {
      setIsGameActive(true);
    } else {
      setIsGameActive(false);
      onGameEnd();
    }
  }, [position, boundaryX, boundaryY, boundaryWidth, boundaryHeight, setIsGameActive, onGameEnd]);

  return (
    <Animated.View
      style={[
        styles.boundary,
        {
          left: boundaryX,
          top: boundaryY,
          width: boundaryWidth,
          height: boundaryHeight,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  boundary: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 255, 0.2)', // Light blue color with some transparency
    borderWidth: 2,
    borderColor: 'blue',
  },
});

export default BoundaryManager;
