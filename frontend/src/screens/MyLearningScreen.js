import { View, Text, FlatList, ActivityIndicator, StatusBar, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import HeaderTitle from '../components/HeaderTitle'
import { SafeAreaView } from 'react-native-safe-area-context'
import CourseLearning from '../components/CourseLearning'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios';
import { Url } from '../contexts/constants'

export default function MyLearningScreen({ navigation }) {
  const { userInfo, coursePurchaseds, setCoursePurchaseds } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const getCoursePurchased = async () => {
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
            className="mt-5"
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