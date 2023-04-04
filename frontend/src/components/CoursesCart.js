import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings';
import { useNavigation } from "@react-navigation/native";
import Checkbox from 'expo-checkbox';

export default function CoursesCart({ item }) {
    const nav = useNavigation();

    const [isChecked, setChecked] = useState(false);

    const formatNumStart = (num) => {
        return num.toFixed(1);
    }
    const formatPrice = (num) => {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
    }
    return (
        <View className="flex-row border border-gray-700 p-2 mt-5 bg-[#1B212D] rounded-lg items-start "
            onPress={() => nav.navigate("CoursesDetail", { course: item })}>
                <View className="w-2/6 flex-row justify-between items-center">
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked} />
                    <Image
                        source={{ uri: item.image }}
                        className="w-20 h-20" />
                </View>
                <View className="w-4/6 ml-2 ">
                    <TouchableOpacity>
                        <Text className="text-white text-lg font-semibold">{item.name}</Text>
                    </TouchableOpacity>
                    <Text className="text-gray-400 text-base">{item.lecturers}</Text>
                    <Text className='text-white font-semibold text-base'>{formatPrice(item.price)}</Text>
                    <TouchableOpacity className="items-center ml-auto mr-5  w-14 ">
                        <Text className="text-red-700 text-base font-bold">Xóa</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}