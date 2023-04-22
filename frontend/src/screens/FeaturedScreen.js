import { View, Text, Image, FlatList, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../contexts/AuthContext'
import CoursesPropose from '../components/CoursesPropose'
import Type from '../components/Type'
import HeaderTitle from '../components/HeaderTitle'
import { Courses, dataType } from '../contexts/Data'
import axios from 'axios';
import { Url } from '../contexts/constants'

export default function FeaturedScreen({ navigation }) {
  const { userInfo, listType, setListType, courses, setCourses } = useContext(AuthContext);
  const [topFiveCourse,setTopFiveCourse] = useState([]);
  const [isLoading,setIsLoading]= useState(true);

  const getType = async () => {
    let list = [];
    try {
      const res = await axios.get(`${Url}/type`);
      // console.log(res.data);
      setListType(res.data)
    } catch (err) {
      console.log(err);
    }
  }
  const getCourse = async () => {
    let list = [];
    try {
      const res = await axios.get(`${Url}/course`);
      // console.log(res.data);
      const listcourse = res.data;
      for (let index = 0; index < listcourse.length; index++) {
        list.push(listcourse[index])
      }
    } catch (err) {
      console.log(err);
    }
    setCourses(list)
    setTopFiveCourse(list.slice(0,5))
  }


  useEffect(() => {
    setTimeout(() => setIsLoading(false), 900)
    getType();
    getCourse();
  }, [])
  if (isLoading) 
    return(
      <SafeAreaView  className="bg-[#0A0909] flex-1 justify-center items-center">
         <ActivityIndicator size={'large'} color={'#1273FE'}/>
      </SafeAreaView>
    )
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <StatusBar/>
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
            data={topFiveCourse}
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
            data={listType}
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
            className="mt-5 mb-20"
            showsHorizontalScrollIndicator={false}
            horizontal
            data={topFiveCourse}
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