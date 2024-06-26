import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const BoundaryManager = ({ position, onGameEnd, setIsGameActive }) => {
  const [boundary] = useState(new Animated.ValueXY({
    x: 50,
    y: 50,
    width: width - 100,
    height: height - 100,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      const newBoundary = {
        x: Math.random() * (width - 100),
        y: Math.random() * (height - 100),
        width: 100 + Math.random() * (width - 100),
        height: 100 + Math.random() * (height - 100),
      };

      Animated.timing(boundary, {
        toValue: newBoundary,
        duration: 2000, // Smooth transition over 2 seconds
        useNativeDriver: false,
      }).start();

      console.log('Boundary updated:', newBoundary);
    }, 5000); // Change shape every 5 seconds

    return () => clearInterval(interval);
  }, [boundary]);

  useEffect(() => {
    const { x, y } = position;
    const bx = boundary.x._value;
    const by = boundary.y._value;
    const bw = boundary.width._value;
    const bh = boundary.height._value;

    console.log('Position:', position);
    console.log('Boundary:', boundary);

    if (x >= bx && x <= bx + bw && y >= by && y <= by + bh) {
      setIsGameActive(true);
    } else {
      setIsGameActive(false);
      onGameEnd();
    }
  }, [position, boundary, setIsGameActive, onGameEnd]);

  return (
    <Animated.View
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
    backgroundColor: 'rgba(0, 0, 255, 0.2)', // Light blue color with some transparency
    borderWidth: 2,
    borderColor: 'blue',
  },
});

export default BoundaryManager;



