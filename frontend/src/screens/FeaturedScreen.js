import { View, Text, Image, FlatList, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../contexts/AuthContext'
import CoursesPropose from '../components/CoursesPropose'
import Type from '../components/Type'
import HeaderTitle from '../components/HeaderTitle'
import axios from 'axios';
import { Url } from '../contexts/constants'
import FavoriteType from '../components/FavoriteType'


export default function FeaturedScreen({ navigation }) {
  const { userInfo, listType, setListType, courses, setCourses, listFavoriteType, setListFavoriteType } = useContext(AuthContext);
  const [topFiveCourse, setTopFiveCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [numColumns, setNumColumns] = useState(0);

  const getType = async () => {
    let list = [];
    try {
      const res = await axios.get(`${Url}/type`);
      // console.log(res.data);
      setListType(res.data)
      setNumColumns(Math.ceil(res.data.length / 2))
    } catch (err) {
      console.log(err);
    }
  }
  const getCourse = async () => {
    let list = [];
    try {
      const res = await axios.get(`${Url}/course/onSale`);
      // console.log(res.data);
      const listcourse = res.data;
      for (let index = 0; index < listcourse.length; index++) {
        list.push(listcourse[index])
      }
    } catch (err) {
      console.log(err);
    }
    setCourses(list)
    setTopFiveCourse(list.slice(0, 5))
  }
  const getFavoriteType = async () => {
    if(Object.keys(userInfo).length!==0)
    try {
      const res = await axios.get(`${Url}/user/getFavoriteType`);
      // console.log(res.data);
      setListFavoriteType(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 900)
    getType();
    getCourse();
    getFavoriteType();
  }, [userInfo])

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getType();
      getCourse();
      getFavoriteType();
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
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <StatusBar backgroundColor={"#0A0909"} />
      <HeaderTitle name='FeaturedScreen' title='' isBack={false} />
      <ScrollView className="p-5"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className="flex-row items-center">
          <Image source={require("../image/user_logo.png")}
            className="w-10 h-10" />
          <Text className="text-white text-base ml-2">Chào bạn! {userInfo.Name}</Text>
        </View>
        <View className="flex-row mt-7 items-center justify-between">
          <Text className="text-white text-xl font-bold">Đề xuất cho bạn</Text>
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
          <Text className="text-white text-xl font-bold">Thể loại</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AllTypeScreen")
            }}>
            <Text className="text-[#1273FE]">Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} className="mt-3" >
          <FlatList
            key={numColumns}
            data={listType}
            numColumns={numColumns}
            scrollEnabled={false}
            renderItem={({ item }) =>
              <Type
                item={item} />
            }
          />
        </ScrollView>

        {/* <FlatList
            className="mt-5"
            showsVerticalScrollIndicator={false}
            data={listFavoriteType}
            renderItem={({ item }) =>
              <View>
                <Text className="text-white text-2xl font-bold">{item.Name}</Text>
              </View>
            }
          /> */}
        <View>
          {listFavoriteType.map((item) => (
            <FavoriteType
              key={item._id}
              item={item}
            />
          ))}
        </View>
      </ScrollView >
    </SafeAreaView>
  )
}