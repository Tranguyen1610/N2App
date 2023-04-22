import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HeaderTitle from '../components/HeaderTitle'
import { SafeAreaView } from 'react-native-safe-area-context'
import CourseLearning from '../components/CourseLearning'
import { AuthContext } from '../contexts/AuthContext'

export default function MyLearningScreen({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  const [listCoursePurchased, setListCoursePurchased] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
    setListCoursePurchased(userInfo.CoursePurchased);
  }, [])
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <HeaderTitle name={MyLearningScreen} title={'Học tập'} isBack={false} />
      {isLoading ?
        <View className="bg-[#0A0909] flex-1 justify-center items-center">
          <ActivityIndicator size={'large'} color={'#1273FE'} />
        </View> :
        <View>
          {listCoursePurchased.length == 0 ?
            <Text className="text-gray-300 text-xl text-center mt-20">
              Chưa có khóa học</Text> : <></>}
          <FlatList
            className="mt-5"
            showsHorizontalScrollIndicator={false}
            data={listCoursePurchased}
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