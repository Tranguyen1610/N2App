import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../components/HeaderTitle'
import { Courses } from '../contexts/Data'
import CoursesList from '../components/CoursesList'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios';
import { Url } from '../contexts/constants'

export default function CourseOfTypeScreen({ route }) {
  const type = route.params.type;
  const [listcourse, setListCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCourseOfType = async () => {
    try {
      const res = await axios.get(`${Url}/course/` + type._id + '/getcourseoftype');
      // console.log(res.data);
      setListCourse(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
    getCourseOfType();
  }, [])

  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <StatusBar backgroundColor={"#0A0909"}/>
      <HeaderTitle name='CourseOfTypeScreen' title={type.Name} isBack={true} />
      {isLoading ?
        <View className="bg-[#0A0909] flex-1 justify-center items-center">
          <ActivityIndicator size={'large'} color={'#1273FE'} />
        </View> :
        <View>
          {listcourse.length == 0 ?
            <Text className="text-gray-300 text-xl text-center mt-20">
              Hiện tại chưa có khóa học</Text> : <></>}
          < FlatList
            className="mt-5"
            showsHorizontalScrollIndicator={false}
            data={listcourse}
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