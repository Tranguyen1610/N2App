import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../contexts/AuthContext'
import CoursesPropose from '../components/CoursesPropose'
import Type from '../components/Type'
import HeaderTitle from '../components/HeaderTitle'

export default function FeaturedScreen({ navigation }) {
  const { userInfo} = useContext(AuthContext)
  const data = [
    {
      "id": 1,
      "image": "https://res.cloudinary.com/dlwvjvd3x/image/upload/v1680279737/Screenshot_2023-03-31_232031_mkmjgu.png",
      "videoInfo": "",
      "name": 'React.JS Cơ bản từ A đến Z',
      "lecturers": "Thai Nguyen",
      "numStar": 4,
      "numRating": 128,
      "price": 1000000
    },
    {
      "id": 2,
      "image": "https://res.cloudinary.com/dlwvjvd3x/image/upload/v1680279737/Screenshot_2023-03-31_232031_mkmjgu.png",
      "videoInfo": "",
      "name": 'React.JS Cơ bản từ A đến Z',
      "lecturers": "Thai Nguyen",
      "numStar": 3,
      "numRating": 128,
      "price": 1000000
    },
    {
      "id": 3,
      "image": "https://res.cloudinary.com/dlwvjvd3x/image/upload/v1680279737/Screenshot_2023-03-31_232031_mkmjgu.png",
      "videoInfo": "",
      "name": 'React.JS Cơ bản từ A đến Z',
      "lecturers": "Thai Nguyen",
      "numStar": 2.5,
      "numRating": 128,
      "price": 100000
    },
  ];
  const dataType = ["Phát triển", "Kinh doanh", "Năng suất làm việc với Office", "Thiết kế", "Phong cách sống", "Sức khỏe & Thể dục",
    "CNTT & Phần mền", "Tài chính và kế toán", "Phát triển cá nhân", "Marketing", "Nhiếp ảnh & Video", "Âm nhạc", "Giảng dạy & học thuật"]
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <HeaderTitle name='FeaturedScreen' title='' isBack={false} nav={navigation}/>
      <ScrollView className="px-5 pt-5"
        showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center">
          <Image source={require("../image/user_logo.png")}
            className="w-10 h-10" />
          <Text className="text-white text-base ml-2">Chào bạn! {userInfo.Name}</Text>
        </View>
        <View className="flex-row mt-5 items-center justify-between">
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
            data={data}
            renderItem={({ item }) =>
              <CoursesPropose
                item={item} />
            }
          />
        </View>
        <View className="flex-row mt-5 items-center justify-between">
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
      </ScrollView >
    </SafeAreaView>
  )
}