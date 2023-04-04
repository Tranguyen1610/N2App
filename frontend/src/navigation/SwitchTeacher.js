import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import StartScreen from '../screens/StartScreen';
import TeacherNavigator from './TeacherNavigator';
export default function SwitchTeacher() {
    const [isLoad, setIsLoad] = useState();
    useEffect(() => {
        setIsLoad(true)
      setTimeout(() => {
        setIsLoad(false)
      }, 1500)
    }, []);
    if (isLoad) {
      return (
        <StartScreen />
      )
    }
    return (
        <TeacherNavigator/>
    );
}