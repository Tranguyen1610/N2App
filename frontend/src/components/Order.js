import { View, Text, FlatList, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CoursesPayment from '../components/CoursesPayment';
import moment from 'moment';
import 'moment/locale/vi';
import { useNavigation } from '@react-navigation/native';


export default function Order({ item }) {
    
    const nav = useNavigation();

    const formatPrice = (num) => {
        if (num != null)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }

    // useEffect(() => {
    // }, [])

    return (
        <TouchableOpacity className="bg-gray-700 mt-5 rounded-md p-3"
            onPress={() => nav.navigate('OrderDetailScreen', { order: item })}>
            <View className='flex-row'>
                <Text className="text-gray-200 text-sm font-medium">Đơn hàng:  </Text>
                <Text className="text-[#1273FE] text-sm font-medium">{item._id.toUpperCase()}</Text>
            </View>
            <FlatList
                className=" px-2"
                showsHorizontalScrollIndicator={false}
                data={item.Detail}
                renderItem={({ item }) =>
                    <CoursesPayment
                        item={item}
                    />
                }
            />
            <View className="flex-row justify-end mt-2">
                <Text className="text-white text-right text-base">Thành tiền:</Text>
                <Text className="text-[#1273FE] text-right text-base font-medium"> {formatPrice(item.MoneyFinal)}</Text>
            </View>    
        </TouchableOpacity>
    )
}