import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../components/HeaderTitle'

export default function WishlistScreen({navigation}) {
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1 ">
      <HeaderTitle name={WishlistScreen} title='Wishlist' isBack={false} nav={navigation}/>
      <Text>Screen4</Text>
    </SafeAreaView>
  )
}