import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation, score, setScore, setIsGameActive }) {
  const handleStartGame = () => {
   // console.log("Start Game clicked");
    setScore(0);
    setIsGameActive(true);
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tilt to Move</Text>
      <Text style={styles.score}>High Score: {score}</Text>
      <Button title="Start Game" onPress={handleStartGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    marginBottom: 20,
  },
});
