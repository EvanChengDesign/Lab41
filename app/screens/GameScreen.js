import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions, Text, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import BoundaryManager from '../BoundaryManager';

const { width, height } = Dimensions.get('window');
const OBJECT_SIZE = 50;
const ACCELERATION_MULTIPLIER = 300; // Increase this value to make the object move faster

export default function GameScreen({ navigation, score, setScore, isGameActive, setIsGameActive }) {
  const [initialPosition, setInitialPosition] = useState({ x: width / 2, y: height / 2 });
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [animatedValue, setAnimatedValue] = useState(new Animated.ValueXY({ x: initialPosition.x - OBJECT_SIZE / 2, y: initialPosition.y - OBJECT_SIZE / 2 }));

  useEffect(() => {
    setAnimatedValue(new Animated.ValueXY({ x: initialPosition.x - OBJECT_SIZE / 2, y: initialPosition.y - OBJECT_SIZE / 2 }));
  }, [initialPosition]);

  useEffect(() => {
    Accelerometer.setUpdateInterval(16);

    const subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
      console.log('Accelerometer data:', accelerometerData);
    });

    return () => subscription && subscription.remove();
  }, []);

  useEffect(() => {
    const { x, y } = data;

    const newX = Math.min(Math.max(animatedValue.x._value + x * ACCELERATION_MULTIPLIER, 0), width - OBJECT_SIZE);
    const newY = Math.min(Math.max(animatedValue.y._value - y * ACCELERATION_MULTIPLIER, 0), height - OBJECT_SIZE);

    console.log('New X:', newX, 'New Y:', newY);

    Animated.spring(animatedValue, {
      toValue: { x: newX, y: newY },
      useNativeDriver: false,
    }).start();
  }, [data]);

  const position = { x: animatedValue.x._value + OBJECT_SIZE / 2, y: animatedValue.y._value + OBJECT_SIZE / 2 };

  const handleGameEnd = () => {
    console.log('Game ended');
    setIsGameActive(false);
    navigation.navigate('Home');
  };

  const handleGameExit = () => {
    setIsGameActive(false);
    navigation.navigate('Home');
  };

  const objectStyle = {
    width: OBJECT_SIZE,
    height: OBJECT_SIZE,
    backgroundColor: 'red',
    borderRadius: OBJECT_SIZE / 2,
    position: 'absolute',
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[objectStyle, animatedValue.getLayout()]} />
      <BoundaryManager
        position={position}
        onGameEnd={handleGameEnd}
        setIsGameActive={setIsGameActive}
      />
      <View style={styles.overlay}>
        <Text style={styles.score}>Score: {score}</Text>
        <Button title="End Game" onPress={handleGameExit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
