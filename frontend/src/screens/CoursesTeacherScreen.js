import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, ActivityIndicator, StatusBar, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Courses } from '../contexts/Data'
import CoursesPropose from '../components/CoursesPropose'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { Url } from '../contexts/constants'

export default function CoursesTeacherScreen() {
  const nav = useNavigation()
  const { userInfo, coursesTC, setCoursesTC, coursesTCUF, setCoursesTCUF, coursesTCNS, setCoursesTCNS } = useContext(AuthContext);
  const [topFiveCourseTC, setTopFiveCourseTC] = useState([]);
  const [topFiveCourseTCUF, setTopFiveCourseTCUF] = useState([]);
  const [topFiveCourseTCNS, setTopFiveCourseTCNS] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const getCourseTC = async () => {
    let list = [];
    try {
      const res = await axios.get(`${Url}/course/getCourseofTeacher`);
      // console.log(res.data);
      const listcourse = res.data;
      for (let index = 0; index < listcourse.length; index++) {
        list.push(listcourse[index])
      }
    } catch (err) {
      console.log(err);
    }
    setCoursesTC(list)
    setTopFiveCourseTC(list.slice(0, 5))
  }

  const getCourseTCUF = async () => {
    let list = [];
    try {
      const res = await axios.get(`${Url}/course/getCourseUnFinishOfTeacher`);
      // console.log(res.data);
      const listcourse = res.data;
      for (let index = 0; index < listcourse.length; index++) {
        list.push(listcourse[index])
      }
    } catch (err) {
      console.log(err);
    }
    setCoursesTCUF(list)
    setTopFiveCourseTCUF(list.slice(0, 5))
  }

  const getCourseTCNS = async () => {
    let list = [];
    try {
      const res = await axios.get(`${Url}/course/getCourseofTeacherNotSale`);
      // console.log(res.data);
      const listcourse = res.data;
      for (let index = 0; index < listcourse.length; index++) {
        list.push(listcourse[index])
      }
    } catch (err) {
      console.log(err);
    }
    setCoursesTCNS(list)
    setTopFiveCourseTCNS(list.slice(0, 5))
  }

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 900)
    getCourseTC();
    getCourseTCUF();
    getCourseTCNS();
  }, [])
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getCourseTC();
      getCourseTCUF();
      getCourseTCNS();
      setRefreshing(false);
    }, 1000);
  }, []);

  if (isLoading)
    return (
      <SafeAreaView className="bg-[#0A0909] flex-1 justify-center items-center">
        <StatusBar backgroundColor={"#0A0909"} />
        <ActivityIndicator size={'large'} color={'#1273FE'} />
      </SafeAreaView>
    )

  return (

    <SafeAreaView className="flex-1 bg-[#0A0909] p-5">
      <StatusBar backgroundColor={"#0A0909"} />
      <ScrollView className=""
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className="flex-row items-center mt-10">
          <Image source={require("../image/user_logo.png")}
            className="w-10 h-10" />
          <Text className="text-white text-base ml-2">Chào bạn! {userInfo.Name}</Text>
        </View>
        <View className="flex-row mt-10 justify-between">
          <TouchableOpacity className="mr-3 mb-3 rounded-xl bg-[#1273FE] w-[45%]"
            onPress={() =>
              nav.navigate('AddCourseScreen')}>
            <Text className="text-white p-2 text-base font-semibold text-center">Thêm khóa học</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mr-3 mb-3 rounded-xl bg-[#1273FE] w-[45%]"
            onPress={() => {
              nav.navigate('CreateRequest')
            }}>
            <Text className="text-white p-2 text-base font-semibold text-center">Tạo yêu cầu</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row mt-7 items-center justify-between">
          <Text className="text-white text-xl font-bold">Khóa học chưa hoàn tất</Text>
          <TouchableOpacity
            onPress={() => {
              nav.navigate("AllCourseTeacherUnFinish")
            }}>
            <Text className="text-[#1273FE]">Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            className="mt-5"
            showsHorizontalScrollIndicator={false}
            horizontal
            data={topFiveCourseTCUF}
            renderItem={({ item }) =>
              <CoursesPropose
                item={item} />
            }
          />
        </View>
        <View className="flex-row mt-7 items-center justify-between">
          <Text className="text-white text-xl font-bold">Khóa học đang bán</Text>
          <TouchableOpacity
            onPress={() => {
              nav.navigate("AllCourseTeacher")
            }}>
            <Text className="text-[#1273FE]">Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            className="mt-5"
            showsHorizontalScrollIndicator={false}
            horizontal
            data={topFiveCourseTC}
            renderItem={({ item }) =>
              <CoursesPropose
                item={item} />
            }
          />
        </View>
        <View className="flex-row mt-7 items-center justify-between">
          <Text className="text-white text-xl font-bold">Khóa học chưa bán</Text>
          <TouchableOpacity
            onPress={() => {
              nav.navigate("AllCourseTeacherNS")
            }}>
            <Text className="text-[#1273FE]">Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            className="mt-5"
            showsHorizontalScrollIndicator={false}
            horizontal
            data={topFiveCourseTCNS}
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