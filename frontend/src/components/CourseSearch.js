import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings';
import { useNavigation } from "@react-navigation/native";

export default function CourseSearch({ item }) {
    const nav = useNavigation();

    const formatNumStart = (num) => {
        if (num != 0)
            return num.toFixed(1);
        else return "0";
    }
    const formatPrice = (num) => {
        if (num!="")
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return "";
    }
    return (
        <TouchableOpacity className="flex-row border border-gray-700 p-2 mt-5 bg-[#1B212D] rounded-lg items-start "
            onPress={() => nav.navigate("CoursesDetail", { course: item })}>
            <View className="w-2/6 flex-row justify-between items-center">
                <Image
                    source={{ uri: item.Image }}
                    className="w-20 h-20" />
            </View>
            <View className="w-4/6 ml-2 ">
                <TouchableOpacity>
                    <Text className="text-white text-lg font-semibold">{item.Name}</Text>
                </TouchableOpacity>
                <Text className="text-gray-400 text-base">{item.Teacher?item.Teacher.Name:""}</Text>
                <Text className='text-white font-semibold text-base'>{formatPrice(item.Price)}</Text>
            </View>
        </TouchableOpacity>
    )
}