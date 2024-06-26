import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../app/screens/HomeScreen';
import GameScreen from '../app/screens/GameScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
  );
}
