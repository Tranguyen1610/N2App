import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import StartScreen from '../screens/StartScreen';
import AuthNavigator from './AuthNavigator';
import RootNavigator from './RootNavigator';

export default function AppNavigator() {
  const { userToken, isLoading } = useContext(AuthContext)
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false)
    }, 1500)
  }, []);
  if (isLoad) {
    return (
      <StartScreen />
    )
  }
  if (userToken !== null)
    return (
      <NavigationContainer>
        {/* {userToken !== null ? <RootNavigator /> : <AuthNavigator />} */}
        <RootNavigator/>
      </NavigationContainer>
    )
  return (
    <NavigationContainer>
      <AuthNavigator/>
    </NavigationContainer>

  );
}

