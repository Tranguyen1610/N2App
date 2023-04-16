import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';

export default function CoursesPropose({ item }) {
    const nav = useNavigation();
    const formatNumStart = (num) => {
        if (num)
            return num.toFixed(1);
        return ""
    }

    const names = (m) => {
        if (m != null) {
            if (m.length <= 40)
                return m
            else
                return m.slice(0, 36) + '...'
        }
        return ""
    }

    const formatPrice = (num) => {
        if (num)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }
    return (
        <TouchableOpacity className="bg-[#1B212D] mr-5 w-56 p-3"
            onPress={() => nav.navigate("CoursesDetail", { course: item })}>
            <Image
                source={{ uri: item.Image }}
                className="w-max h-28" />
            <Text className="text-white text-lg font-semibold h-14">{names(item.Name)}</Text>
            <Text className="text-gray-400 text-base">{item.Teacher.Name}</Text>
            <View
                className="flex-row">
                <Text className="text-[#f1c40f] mr-2 font-medium"> {formatNumStart(4.1)}</Text>
                <Rating
                    ratingCount={5}
                    imageSize={20}
                    tintColor='#1B212D'
                    readonly
                    startingValue={item.numStar}
                />
                <Text className="text-gray-500 ml-4">(230)</Text>
            </View>
            <Text className='text-white font-semibold text-base'>{formatPrice(item.Price)}</Text>
        </TouchableOpacity>
    )
}