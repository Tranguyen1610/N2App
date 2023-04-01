import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Search from '../components/Search'
import HeaderTitle from '../components/HeaderTitle'

export default function SearchScreen({navigation}) {
  const data = ["sql", "html", "javascript", "c#", "react native"]
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <HeaderTitle name={'SearchScreen'} title="" isBack={false} />
      <View className="mx-5">
        <Text className="text-white text-2xl font-bold mt-5 mb-2">Top 5 tìm kiếm</Text>
        <FlatList
          data={data}
          renderItem={({ item }) =>
            <Search item={item} />
          }
        />
      </View>
    </SafeAreaView>
  )
}