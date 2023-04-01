import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../components/HeaderTitle'
export default function ProposalScreen({navigation}) {
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <HeaderTitle name='ProposalScreen' title='Đề xuất cho bạn' isBack={true} nav={navigation}/>
      <Text>AllTypeScreen</Text>
    </SafeAreaView>
  )
}