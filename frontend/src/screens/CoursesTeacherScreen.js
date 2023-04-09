import { View, Text, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Courses } from '../contexts/Data'
import CoursesPropose from '../components/CoursesPropose'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'

export default function CoursesTeacherScreen() {
  const nav = useNavigation()
  const { userInfo } = useContext(AuthContext)
  return (

    <SafeAreaView className="flex-1 bg-[#0A0909]">
      <ScrollView className="px-5"
        showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center mt-10">
          <Image source={require("../image/user_logo.png")}
            className="w-10 h-10" />
          <Text className="text-white text-base ml-2">Chào bạn! {userInfo.Name}</Text>
        </View>
        <View className="flex-row mt-10 justify-between">
          <TouchableOpacity className="mr-3 mb-3 rounded-xl border border-white bg-[#1B212D]"
            onPress={()=>
              nav.navigate('AddCourseScreen')}>
            <Text className="text-white p-2 text-base font-semibold">Thêm khóa học</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mr-3 mb-3 rounded-xl border border-white bg-[#1B212D]">
            <Text className="text-white p-2 text-base font-semibold">Tìm kiếm</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mr-3 mb-3 rounded-xl border border-white bg-[#1B212D]">
            <Text className="text-white p-2 text-base font-semibold">Phản hồi đánh giá</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row mt-7 items-center justify-between">
          <Text className="text-white text-2xl font-bold">Khóa học thêm bởi bạn</Text>
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
          <Text className="text-white text-2xl font-bold">Khóa học chưa hoàn tất</Text>
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
      </ScrollView>
    </SafeAreaView>
  )
}