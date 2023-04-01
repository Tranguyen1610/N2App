import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../components/HeaderTitle'
import { dataType } from '../contexts/Data'
export default function AllTypeScreen() {
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <HeaderTitle name='AllTypeScreen' title='Thể loại' isBack={true}  />
      <FlatList
        className="mt-5"
        data={dataType}
        renderItem={({ item }) =>
          <TouchableOpacity>
            <Text className="text-white text-lg my-2 ml-6">{item}</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  )
}