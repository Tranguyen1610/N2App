import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import StartScreen from '../screens/StartScreen';
import HomeNavigator from './HomeNavigator'
export default function SwitchStudent() {
    const [isLoading, setIsLoading] = useState();
    useEffect(() => {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
    }, []);
    if (isLoading) {
      return (
        <StartScreen />
      )
    }
    return (
        <HomeNavigator/>
    );
}