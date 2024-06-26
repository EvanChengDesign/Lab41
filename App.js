import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { GameProvider } from './app/context/GameContext';

export default function App() {
  console.log('App rendering');

  return (
    <GameProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </GameProvider>
  );
}
