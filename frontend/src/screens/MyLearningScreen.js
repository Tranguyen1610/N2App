import { View, Text, FlatList } from 'react-native'
import React, { useContext } from 'react'
import HeaderTitle from '../components/HeaderTitle'
import { SafeAreaView } from 'react-native-safe-area-context'
import CoursesList from '../components/CoursesList'
import { AuthContext } from '../contexts/AuthContext'

export default function MyLearningScreen({navigation}) {
  const { courses } = useContext(AuthContext);
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <HeaderTitle name={MyLearningScreen} title={'Học tập'} isBack={false} />
      <FlatList
        className="mt-5"
        showsHorizontalScrollIndicator={false}
        data={courses}
        renderItem={({ item }) =>
          <CoursesList
            item={item} />
        }
      />
    </SafeAreaView>
  )
}