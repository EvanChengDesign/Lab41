import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions, Text, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { GameContext } from '../context/GameContext';
import BoundaryManager from '../../BoundaryManagercontext/BoundaryManager';

const { width, height } = Dimensions.get('window');

export default function GameScreen({ navigation }) {
  const context = useContext(GameContext);

  console.log('GameScreen context:', context);

  if (!context) {
    return <Text>Loading...</Text>;
  }

  const { score, setScore, setIsGameActive } = context;
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [animatedValue] = useState(new Animated.ValueXY({ x: width / 2 - 25, y: height / 2 - 25 }));

  useEffect(() => {
    Accelerometer.setUpdateInterval(16);

    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });

    return () => subscription && subscription.remove();
  }, []);

  useEffect(() => {
    const { x, y } = data;

    const newX = Math.min(Math.max(animatedValue.x._value + x * 100, 0), width - 50);
    const newY = Math.min(Math.max(animatedValue.y._value - y * 100, 0), height - 50);

    Animated.spring(animatedValue, {
      toValue: { x: newX, y: newY },
      useNativeDriver: false,
    }).start();
  }, [data]);

  const position = { x: animatedValue.x._value, y: animatedValue.y._value };

  const handleGameEnd = () => {
    setIsGameActive(false);
    navigation.navigate('Home');
  };

  const objectStyle = {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 25,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[objectStyle, animatedValue.getLayout()]} />
      <Text style={styles.score}>Score: {score}</Text>
      <BoundaryManager position={position} onGameEnd={handleGameEnd} />
      <Button title="End Game" onPress={handleGameEnd} />
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
  score: {
    position: 'absolute',
    top: 50,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
