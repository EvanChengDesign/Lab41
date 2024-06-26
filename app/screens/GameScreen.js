import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions, Text, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import BoundaryManager from '../BoundaryManager';

const { width, height } = Dimensions.get('window');

export default function GameScreen({ navigation, score, setScore, isGameActive, setIsGameActive }) {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [animatedValue] = useState(new Animated.ValueXY({ x: width / 2 - 25, y: height / 2 - 25 }));

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

    const newX = Math.min(Math.max(animatedValue.x._value + x * 100, 0), width - 50);
    const newY = Math.min(Math.max(animatedValue.y._value - y * 100, 0), height - 50);

    console.log('New X:', newX, 'New Y:', newY);

    Animated.spring(animatedValue, {
      toValue: { x: newX, y: newY },
      useNativeDriver: false,
    }).start();
  }, [data]);

  const position = { x: animatedValue.x._value, y: animatedValue.y._value };

  const handleGameEnd = () => {
    console.log('Game ended');
    setIsGameActive(false);
    navigation.navigate('Home');
  };

  const objectStyle = {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 25,
    position: 'absolute',
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[objectStyle, animatedValue.getLayout()]} />
      <BoundaryManager position={position} onGameEnd={handleGameEnd} setIsGameActive={setIsGameActive} />
      <View style={styles.overlay}>
        <Text style={styles.score}>Score: {score}</Text>
        <Button title="End Game" onPress={handleGameEnd} />
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

