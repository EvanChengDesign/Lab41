import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GameContext } from '../context/GameContext';

export default function HomeScreen({ navigation }) {
  const context = useContext(GameContext);

  console.log('HomeScreen context:', context);

  if (!context) {
    return <Text>Loading...</Text>;
  }

  const { score, setScore } = context;

  const handleStartGame = () => {
    setScore(0);
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
