import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../contexts/AuthContext'
import CoursesPropose from '../components/CoursesPropose'
import Type from '../components/Type'
import HeaderTitle from '../components/HeaderTitle'
import { Courses, dataType } from '../contexts/Data'

export default function FeaturedScreen({navigation}) {
  const { userInfo} = useContext(AuthContext)

  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <HeaderTitle name='FeaturedScreen' title='' isBack={false} />
      <ScrollView className="px-5 pt-5"
        showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center">
          <Image source={require("../image/user_logo.png")}
            className="w-10 h-10" />
          <Text className="text-white text-base ml-2">Chào bạn! {userInfo.Name}</Text>
        </View>
        <View className="flex-row mt-7 items-center justify-between">
          <Text className="text-white text-2xl font-bold">Đề xuất cho bạn</Text>
          <TouchableOpacity 
          onPress={() => {
            navigation.navigate("ProposalScreen")
          }}>
            <Text className="text-[#1273FE]">Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            className="mt-5"
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Courses}
            renderItem={({ item }) =>
              <CoursesPropose
                item={item} />
            }
          />
        </View>
        <View className="flex-row mt-7 items-center justify-between">
          <Text className="text-white text-2xl font-bold">Thể loại</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AllTypeScreen")
            }}>
            <Text className="text-[#1273FE]">Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} className="mt-3" >
          <FlatList
            data={dataType}
            numColumns={Math.ceil(dataType.length / 2)}
            scrollEnabled={false}
            renderItem={({ item }) =>
              <Type
                item={item} />
            }
          />
        </ScrollView>
        <View className="flex-row mt-7 items-center justify-between">
          <Text className="text-white text-2xl font-bold">CNTT & Phần mềm</Text>
          <TouchableOpacity 
          onPress={() => {
            navigation.navigate("ProposalScreen")
          }}>
            <Text className="text-[#1273FE]">Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            className="mt-5"
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Courses}
            renderItem={({ item }) =>
              <CoursesPropose
                item={item} />
            }
          />
        </View>
      </ScrollView >
    </SafeAreaView>
  )
}