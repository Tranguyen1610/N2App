import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../components/HeaderTitle'
import { CoursesWL } from '../contexts/Data'
import CoursesList from '../components/CoursesList'
import { AuthContext } from '../contexts/AuthContext'

export default function WishlistScreen() {
  const { userInfo } = useContext(AuthContext);
  const [wishlists,setWishLists]= useState([])

  useEffect(()=>{
    setWishLists(userInfo.WishList)
  },[])
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1 ">
      <HeaderTitle name={WishlistScreen} title='Wishlist' isBack={false} />
      <FlatList
        className="mt-5"
        showsHorizontalScrollIndicator={false}
        data={wishlists}
        renderItem={({ item }) =>
          <CoursesList
            item={item} />
        }
      />
    </SafeAreaView>
  )
}