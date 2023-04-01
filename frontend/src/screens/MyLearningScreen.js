import { View, Text } from 'react-native'
import React from 'react'
import HeaderTitle from '../components/HeaderTitle'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MyLearningScreen({navigation}) {
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <HeaderTitle name={MyLearningScreen} title={'Học tập'} isBack={false} nav={navigation}/>
      <View>
      <Text>Screen3</Text>
      </View>
    </SafeAreaView>
  )
}