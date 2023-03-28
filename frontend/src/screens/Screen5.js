import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function Screen5() {
  const { logout} = useContext(AuthContext)
  return (
    <View className="bg-[#0A0909] flex-1">
      <TouchableOpacity
        onPress={()=>logout()}>
        <Text className="text-base text-white">
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </View>
  )
}