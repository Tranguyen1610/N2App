import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HomeNavigator from './HomeNavigator'
import TeacherNavigator from './TeacherNavigator'
export default function SwitchNavigator({ navigation }) {
  const [mode,setMode]=useState()
  const load = async()=>{
    const m = await AsyncStorage.getItem('mode');
    setMode(m)
  }
  useEffect(()=>{
    load()
  },[])
  if(mode=="Teacher")
    return <TeacherNavigator/>
  return <HomeNavigator/>
}