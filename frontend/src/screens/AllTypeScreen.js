import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../components/HeaderTitle'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
export default function AllTypeScreen() {
  const nav = useNavigation()
  const { listType } = useContext(AuthContext);
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <StatusBar backgroundColor={"#0A0909"}/>
      <HeaderTitle name='AllTypeScreen' title='Thể loại' isBack={true} />
      <FlatList
        className="mt-5"
        data={listType}
        renderItem={({ item }) =>
          <TouchableOpacity
            onPress={() => nav.navigate("CourseOfTypeScreen", { type: item })}>
            <Text className="text-white text-lg my-2 ml-6">{item.Name}</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  )
}