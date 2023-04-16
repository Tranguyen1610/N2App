import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../components/HeaderTitle'
import { AuthContext } from '../contexts/AuthContext';
export default function AllTypeScreen() {
  const { listType } = useContext(AuthContext);
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <HeaderTitle name='AllTypeScreen' title='Thể loại' isBack={true}  />
      <FlatList
        className="mt-5"
        data={listType}
        renderItem={({ item }) =>
          <TouchableOpacity>
            <Text className="text-white text-lg my-2 ml-6">{item}</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  )
}