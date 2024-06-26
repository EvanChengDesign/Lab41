import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';

const Stack = createStackNavigator();

export default function StackNavigator({ score, setScore, isGameActive, setIsGameActive }) {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {props => (
            <HomeScreen
              {...props}
              score={score}
              setScore={setScore}
              setIsGameActive={setIsGameActive}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Game">
          {props => (
            <GameScreen
              {...props}
              score={score}
              setScore={setScore}
              isGameActive={isGameActive}
              setIsGameActive={setIsGameActive}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
  );
}
