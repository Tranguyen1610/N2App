import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Search from '../components/Search'
import HeaderTitle from '../components/HeaderTitle'
import { AuthContext } from '../contexts/AuthContext'
import { Url } from '../contexts/constants';
import axios from 'axios';
import CoursesCart from '../components/CoursesCart'
import CourseSearch from '../components/CourseSearch'

export default function SearchScreen({ navigation }) {
  const data = ["sql", "html", "javascript", "c#", "react native"];
  const [listSearchCourse, setListSearchCourse] = useState([])
  const { courses, setCourses, textSearch, setTextSearch } = useContext(AuthContext);
  const convert = (string) => {
    if (string != null)
      return string.toString().toLowerCase()
    else return ""
  }

  useEffect(() => {
    const getAllCourse = async () => {
      try {
        const res = await axios.get(`${Url}/course`);
        setCourses(res.data);
      } catch (err) {
        setCourses(null);
        console.log(err);
      }
    }
    getAllCourse();
    setTextSearch("");
  }, [])

  useEffect(() => {
    let list = []
    if (textSearch) {
      courses.forEach((u) => {
        if (convert(u.Name).includes(textSearch.toLocaleLowerCase())) {
          // if
          list.push(u)
        }
      });
      setListSearchCourse(list)
    }
    else setListSearchCourse([])
    // console.log(list);
  }, [textSearch])

  return (
    <SafeAreaView className="bg-[#0A0909] flex-1">
      <HeaderTitle name={'SearchScreen'} title="" isBack={false} />
      {listSearchCourse.length > 0 ?
        <View className="mx-5 mt-5">
          {listSearchCourse.map((g) => (
           <CourseSearch key={g._id} item={g}/>
          ))}
        </View> :
        <View className="mx-5">
          <Text className="text-white text-2xl font-bold mt-5 mb-2">Top 5 tìm kiếm</Text>
          <FlatList
            data={data}
            renderItem={({ item }) =>
              <Search item={item} />
            }
          />
          <Text className="text-gray-400 text-center text-xl mt-10" >
            Không tìm thấy kết quả</Text>
        </View>}
    </SafeAreaView>
  )
}