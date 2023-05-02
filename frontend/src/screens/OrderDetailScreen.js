import { View, Text, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import CoursesPayment from '../components/CoursesPayment';
import moment from 'moment';
import 'moment/locale/vi';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Url } from '../contexts/constants'

export default function OrderDetailScreen({ route }) {
    const order = route.params.order;
    useEffect(() => {
        // console.log(order);
    }, [])
    return (
        <View className="flex-1 bg-[#0A0909] p-5">
            <StatusBar backgroundColor={"#0A0909"}/>
            <View className='bg-[#1273FE] p-5 rounded-md mb-5'>
                {order.IsPayment ?
                    <Text className="text-white text-base font-medium">
                        Đơn hàng đã hoàn thành
                    </Text> : <></>}
                {!order.IsPayment && !order.IsCancel ?
                    <Text className="text-white text-base font-medium">
                        Đơn hàng chưa được thanh toán
                    </Text> : <></>}
                {order.IsCancel ?
                    <Text className="text-white text-base font-medium">
                        Đơn hàng đã được hủy
                    </Text> : <></>}
            </View>
            <Text className='text-white text-lg font-medium'>Danh sách khóa học</Text>
            <FlatList
                className='mb-72'
                showsHorizontalScrollIndicator={false}
                data={order.Detail}
                renderItem={({ item }) =>
                    <CoursesPayment
                        item={item}
                    />
                }
            />
            <View className='absolute bottom-5 left-5 justify-end h-64'>
                <View className='flex-row justify-between'>
                    <Text className='text-white text-base font-medium'>Mã đơn hàng</Text>
                    <Text className='text-[#1273FE] text-base font-medium'>{order._id.toUpperCase()}</Text>
                </View>
                <View className='flex-row justify-between mt-1'>
                    <Text className='text-white text-base'>Thời gian đặt hàng</Text>
                    <Text className='text-gray-400 text-base'>{moment(order.createdAt).format('lll')}</Text>
                </View>
                {order.IsPayment ?
                    <View className='flex-row justify-between mt-1'>
                        <Text className='text-white text-base'>Thời gian thanh toán</Text>
                        <Text className='text-gray-400 text-base'>{moment(order.updatedAt).format('lll')}</Text>
                    </View> : <></>}
                {order.IsCancel ?
                    <View className='flex-row justify-between mt-1'>
                        <Text className='text-white text-base'>Thời gian hủy</Text>
                        <Text className='text-gray-400 text-base'>{moment(order.updatedAt).format('lll')}</Text>
                    </View> : <></>}
                <View className='mt-5 bg-gray-800 p-3 rounded-md'>
                    <View className='flex-row'>
                        <MaterialIcons name="monetization-on" size={24} color="#1273FE" />
                        <Text className='text-white text-base font-medium ml-5'>Phương thức thanh toán</Text>
                    </View>
                    <View className='flex-row mt-5'>
                        <View className="items-center flex-row w-5/6">
                            <Text className="text-white ml-3 text-base">
                                {order.PayMentType.Description}
                            </Text>
                        </View>
                        <View className='w-1/6 justify-center'>
                            <Image
                                source={{uri:order.PayMentType.Logo}}
                                className="w-10 h-10 ml rounded-md"
                            />
                        </View>
                    </View>
                </View>
                {!order.IsPayment && !order.IsCancel ?
                    <View className='flex-row justify-between'>
                        <TouchableOpacity className="bg-red-600 items-center justify-center mt-3 p-2 rounded-md w-[45%]"
                        // onPress={() => handlePayment()}
                        >
                            <Text className="text-white font-semibold text-lg">Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#1273FE] items-center justify-center mt-3 p-2 rounded-md w-[45%]"
                        // onPress={() => handlePayment()}
                        >
                            <Text className="text-white font-semibold text-lg">Thanh Toán</Text>
                        </TouchableOpacity>
                    </View> : <></>}
            </View>
        </View>
    )
}