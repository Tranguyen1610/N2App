import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { CoursesWL } from '../contexts/Data'
import CoursesCart from '../components/CoursesCart'

export default function CardScreen() {
    const [isChecked, setChecked] = useState(false);
    const [total, setTotal] = useState("0 đ");
    return (
        <SafeAreaView className="bg-[#0A0909] flex-1">
            <FlatList
                className=" px-2"
                showsHorizontalScrollIndicator={false}
                data={CoursesWL}
                renderItem={({ item }) =>
                    <CoursesCart
                        item={item} />
                }
            />
            <View className="absolute bottom-0 flex-row w-screen h-14 ">
                <View className="bg-[#242F41] items-center justify-center w-3/12 flex-row border-r-2 border-gray-800">
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                    />
                    <Text className="text-base ml-2 text-gray-400" >Tất cả</Text>
                </View>
                <View className="bg-[#242F41] items-center justify-center w-5/12">
                    <Text className="text-gray-400 text-base font-medium">Tổng thanh toán</Text>
                    <Text className="text-[#1273FE] text-base font-medium">{total}</Text>
                </View>
                <TouchableOpacity className="bg-[#1273FE] items-center justify-center w-4/12">
                    <Text className="text-white font-semibold text-xl">Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}