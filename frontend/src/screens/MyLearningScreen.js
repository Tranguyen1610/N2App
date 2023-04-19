import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HeaderTitle from '../components/HeaderTitle'
import { SafeAreaView } from 'react-native-safe-area-context'
import CourseLearning from '../components/CourseLearning'
import { AuthContext } from '../contexts/AuthContext'

export default function MyLearningScreen({navigation}) {
  const { userInfo } = useContext(AuthContext);
  const [listCoursePurchased,setListCoursePurchased] = useState([])

  useEffect(()=>{
    setListCoursePurchased(userInfo.CoursePurchased);
  },[])
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <HeaderTitle name={MyLearningScreen} title={'Học tập'} isBack={false} />
      <FlatList
        className="mt-5"
        showsHorizontalScrollIndicator={false}
        data={listCoursePurchased}
        renderItem={({ item }) =>
          <CourseLearning
            item={item} />
        }
      />
    </SafeAreaView>
  )
}