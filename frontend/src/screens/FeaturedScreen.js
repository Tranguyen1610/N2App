import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react' 
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../contexts/AuthContext'

export default function FeaturedScreen() {
  const { userInfo } = useContext(AuthContext)
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1 px-5 pt-5">
      <View className="flex-row items-center">
        <Image source={require("../image/user_logo.png")} 
          className="w-10 h-10"/>
        <Text className="text-white text-base ml-2">Chào bạn! {userInfo.Name}</Text>
      </View>
    </SafeAreaView>
  )
}