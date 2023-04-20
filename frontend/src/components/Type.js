import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
export default function Type({item}) {
  const nav= useNavigation();
  // useEffect(()=>{
  //   console.log({item});
  // },[])
  return (
    <TouchableOpacity className="mr-3 mb-3 rounded-xl border border-white"
      onPress={()=>nav.navigate("CourseOfTypeScreen",{type:item})}>
      <Text className="text-white p-2 text-base font-semibold">{item.Name}</Text>
    </TouchableOpacity>
  )
}