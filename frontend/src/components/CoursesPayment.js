import { View, Text, TouchableOpacity, Image, Alert, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from 'react-native-ratings';
import { useNavigation } from "@react-navigation/native";
import Checkbox from 'expo-checkbox';
import Toast from 'react-native-root-toast';
import axios from 'axios';
import { Url } from '../contexts/constants'

export default function CoursesCart({ item, carts, setCCarts, setTotal, setIsAllChecked }) {
    const nav = useNavigation();

    const formatNumStart = (num) => {
        if (num)
            return num.toFixed(1);
        return "";
    }
    const formatPrice = (num) => {
        if (num != null)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }
    useEffect(() => {
        // console.log(item);
    }, [])
    return (
        <View className="flex-row border border-gray-700 p-2 mt-5 bg-[#1B212D] rounded-lg items-center px-3 "
            onPress={() => nav.navigate("CoursesDetail", { course: item })}>
            <View className="w-3/12 justify-center">
                <Image
                    source={{ uri: item.Image }}
                    className="w-20 h-20" />
            </View>
            <View className="w-9/12 pl-3">
                <Text className="text-white text-lg font-semibold" numberOfLines={2}>{item.Name}</Text>
                <Text className="text-gray-400 text-base">hfhf</Text>
                <Text className='text-white font-semibold text-base'>{formatPrice(item.Price)}</Text>
            </View>

        </View>
    )
}