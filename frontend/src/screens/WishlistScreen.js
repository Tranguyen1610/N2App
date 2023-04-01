import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../components/HeaderTitle'
import { CoursesWL } from '../contexts/Data'
import CoursesList from '../components/CoursesList'

export default function WishlistScreen() {
  
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1 ">
      <HeaderTitle name={WishlistScreen} title='Wishlist' isBack={false} />
      <FlatList
        className="mt-5"
        showsHorizontalScrollIndicator={false}
        data={CoursesWL}
        renderItem={({ item }) =>
          <CoursesList
            item={item} />
        }
      />
    </SafeAreaView>
  )
}