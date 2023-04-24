import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import CoursesPropose from './CoursesPropose';
import { Url } from '../contexts/constants';
import axios from 'axios';

export default function FavoriteType({ item }) {
    const nav = useNavigation();
    const [listcourse, setListCourse] = useState([]);


    const getCourseOfType = async () => {
        try {
            const res = await axios.get(`${Url}/course/` + item._id + '/getcourseoftype');
            // console.log(res.data);
            if (res.data.legth > 5)
                setListCourse(res.data.slice(0, 5));
            else
                setListCourse(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCourseOfType();
    }, [])

    return (
        <View>
            {listcourse.length > 0 ?
                <View>
                    <View className="flex-row mt-5 items-center justify-between">
                        <Text className="text-white text-xl font-bold">{item.Name}</Text>
                        <TouchableOpacity
                            onPress={() => nav.navigate("CourseOfTypeScreen", { type: item })}>
                            <Text className="text-[#1273FE]">Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            className="mt-5"
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={listcourse}
                            renderItem={({ item }) =>
                                <CoursesPropose
                                    item={item} />
                            }
                        />
                    </View>
                </View>
                : <></>}
        </View>
    )
}