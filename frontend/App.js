import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { AuthContextProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import StartScreen from './src/screens/StartScreen';
import registerNNPushToken from 'native-notify';

export default function App() {
  registerNNPushToken(7935, 'PWYYF7cD5ED659WILjyXpt');
  return (
    <AuthContextProvider>
      <AppNavigator/>
    </AuthContextProvider>
  );
}
