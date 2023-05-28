import { View, Text, FlatList, ActivityIndicator, StatusBar, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import HeaderTitle from '../components/HeaderTitle'
import { SafeAreaView } from 'react-native-safe-area-context'
import CourseLearning from '../components/CourseLearning'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios';
import { Url } from '../contexts/constants'
import { useNavigation } from '@react-navigation/native'

export default function MyLearningScreen({ navigation }) {
  const { userInfo, coursePurchaseds, setCoursePurchaseds, setUseHide } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigation();

  const getCoursePurchased = async () => {
    if (Object.keys(userInfo).length !== 0)
      try {
        const result = await axios.get(`${Url}/user/getCoursePurchased`);
        if (result.data) {
          setCoursePurchaseds(result.data)
        }
      }
      catch (err) {
        console.log(err);
      }
  }

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
    getCoursePurchased();
  }, [])

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getCoursePurchased();
      setRefreshing(false);
    }, 1000);
  }, []);

  if(Object.keys(userInfo).length===0)
    return(
      <View className="bg-[#0A0909] flex-1 justify-center items-center">
        <Text className='text-white text-lg'> Bạn cần đăng nhập để sử dụng tính năng này</Text>
        <TouchableOpacity className="mt-5"
          onPress={()=>setUseHide(false)}>
          <Text className='bg-[#1273FE] text-white p-3 text-base font-medium rounded-md'> Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    )
  else

  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <StatusBar backgroundColor={"#0A0909"} />
      <HeaderTitle name={MyLearningScreen} title={'Học tập'} isBack={false} />
      {isLoading ?
        <View className="bg-[#0A0909] flex-1 justify-center items-center">
          <ActivityIndicator size={'large'} color={'#1273FE'} />
        </View> :
        <View>
          {coursePurchaseds.length == 0 ?
            <Text className="text-gray-300 text-xl text-center mt-20">
              Chưa có khóa học</Text> : <></>}
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            className="mt-5 mb-10"
            showsHorizontalScrollIndicator={false}
            data={coursePurchaseds}
            renderItem={({ item }) =>
              <CourseLearning
                item={item} />
            }
          />
        </View>
      }
    </SafeAreaView>
  )
}