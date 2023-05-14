import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../components/HeaderTitle'
import { Courses } from '../contexts/Data'
import CoursesList from '../components/CoursesList'
import { AuthContext } from '../contexts/AuthContext'
export default function AllCourseTeacherNS({ navigation }) {
  const { coursesTCNS } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, [])
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <StatusBar backgroundColor={"#0A0909"}/>
      {isLoading ?
        <View className="bg-[#0A0909] flex-1 justify-center items-center">
          <ActivityIndicator size={'large'} color={'#1273FE'} />
        </View> :
        <View>
        {coursesTCNS.length == 0 ?
          <Text className="text-gray-300 text-xl text-center mt-20">
            Hiện tại chưa có khóa học</Text> : <></>}
        <FlatList
          className="mt-5"
          showsHorizontalScrollIndicator={false}
          data={coursesTCNS}
          renderItem={({ item }) =>
            <CoursesList
              item={item} />
          }
        />
        </View>
      }
    </SafeAreaView>
  )
}