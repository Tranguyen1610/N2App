import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../components/HeaderTitle'
import { Courses } from '../contexts/Data'
import CoursesList from '../components/CoursesList'
export default function ProposalScreen({navigation}) {
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <HeaderTitle name='ProposalScreen' title='Đề xuất cho bạn' isBack={true} />
      <FlatList
            className="mt-5"
            showsHorizontalScrollIndicator={false}
            data={Courses}
            renderItem={({ item }) =>
              <CoursesList
                item={item} />
            }
          />
    </SafeAreaView>
  )
}