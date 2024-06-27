import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');
const OBJECT_SIZE = 50;
const MIN_RADIUS = OBJECT_SIZE * 1.5;
const MAX_RADIUS = Math.min(width, height) / 3;

const BoundaryManager = ({ position, onGameEnd, setIsGameActive }) => {
  const boundaryX = useState(new Animated.Value(width / 2 - MIN_RADIUS))[0];
  const boundaryY = useState(new Animated.Value(height / 2 - MIN_RADIUS))[0];
  const boundaryRadius = useState(new Animated.Value(MIN_RADIUS))[0];

  useEffect(() => {
    const updateBoundary = () => {
      const radius = MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);
      const maxX = width - radius * 2;
      const maxY = height - radius * 2;
      const newBoundary = {
        x: Math.random() * maxX,
        y: Math.random() * maxY,
        radius,
      };

      Animated.timing(boundaryX, {
        toValue: newBoundary.x,
        duration: 5000,
        useNativeDriver: false,
      }).start();

      Animated.timing(boundaryY, {
        toValue: newBoundary.y,
        duration: 5000,
        useNativeDriver: false,
      }).start();

      Animated.timing(boundaryRadius, {
        toValue: newBoundary.radius,
        duration: 5000,
        useNativeDriver: false,
      }).start();

      // console.log('Boundary updated:', newBoundary);
    };

    updateBoundary();
    const interval = setInterval(updateBoundary, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const { x, y } = position;

    const bx = boundaryX._value + boundaryRadius._value;
    const by = boundaryY._value + boundaryRadius._value;
    const br = boundaryRadius._value;

    // console.log('Position:', position);
    // console.log('Boundary:', { bx, by, br });

    const distance = Math.sqrt((x - bx) ** 2 + (y - by) ** 2);

    if (distance <= br - OBJECT_SIZE / 2) {
      setIsGameActive(true);
    } else {
      setIsGameActive(false);
      onGameEnd();
    }

    if (x <= OBJECT_SIZE / 2 || x >= width - OBJECT_SIZE / 2 || y <= OBJECT_SIZE / 2 || y >= height - OBJECT_SIZE / 2) {
      setIsGameActive(false);
      onGameEnd();
    }
  }, [position, boundaryX, boundaryY, boundaryRadius, setIsGameActive, onGameEnd]);

  return (
    <Animated.View
      style={[
        styles.boundary,
        {
          left: boundaryX,
          top: boundaryY,
          width: boundaryRadius.interpolate({
            inputRange: [0, Math.min(width, height) / 2],
            outputRange: [0, Math.min(width, height)],
          }),
          height: boundaryRadius.interpolate({
            inputRange: [0, Math.min(width, height) / 2],
            outputRange: [0, Math.min(width, height)],
          }),
          borderRadius: boundaryRadius,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  boundary: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'blue',
  },
});

export default BoundaryManager;
