import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { AuthContextProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import StartScreen from './src/screens/StartScreen';

export default function App() {
  return (
    <AuthContextProvider>
      <AppNavigator/>
    </AuthContextProvider>
  );
}
