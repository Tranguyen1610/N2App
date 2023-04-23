import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../components/HeaderTitle'
import { Courses } from '../contexts/Data'
import CoursesList from '../components/CoursesList'
import { AuthContext } from '../contexts/AuthContext'
export default function ProposalScreen({ navigation }) {
  const { courses } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, [])
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <HeaderTitle name='ProposalScreen' title='Đề xuất cho bạn' isBack={true} />
      {isLoading ?
        <View className="bg-[#0A0909] flex-1 justify-center items-center">
          <ActivityIndicator size={'large'} color={'#1273FE'} />
        </View> :
        <FlatList
          className="mt-5"
          showsHorizontalScrollIndicator={false}
          data={courses}
          renderItem={({ item }) =>
            <CoursesList
              item={item} />
          }
        />
      }
    </SafeAreaView>
  )
}