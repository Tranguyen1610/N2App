import { View, Text, FlatList } from 'react-native'
import React from 'react'
import HeaderTitle from '../components/HeaderTitle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CoursesL } from '../contexts/Data'
import CoursesList from '../components/CoursesList'

export default function MyLearningScreen({navigation}) {
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <HeaderTitle name={MyLearningScreen} title={'Học tập'} isBack={false} />
      <FlatList
        className="mt-5"
        showsHorizontalScrollIndicator={false}
        data={CoursesL}
        renderItem={({ item }) =>
          <CoursesList
            item={item} />
        }
      />
    </SafeAreaView>
  )
}