import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from 'react-native-ratings';
import { useNavigation } from "@react-navigation/native";
import Checkbox from 'expo-checkbox';

export default function CoursesCart({ item, carts, setCarts, setTotal, setIsAllChecked }) {
    const nav = useNavigation();
    const [isCheckedCourse, setIsCheckedCourse] = useState(item.isChecked);
    const formatNumStart = (num) => {
        if (num)
            return num.toFixed(1);
        return "";
    }
    const formatPrice = (num) => {
        if (num)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
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
    useEffect(() => {
        // console.log(item);
    }, [])

    const check = () => {
        const v = carts.findIndex((cart) => cart._id == item._id);
        carts[v].isChecked = !isCheckedCourse;
        setIsCheckedCourse(!isCheckedCourse);
        var t = 0;
        carts.forEach((cart) => {
            if (cart.isChecked) {
                t = t + cart.Price;
            }
        });
        setTotal(t);

        setIsAllChecked(false)
        var all = true;
        for (let index = 0; index < carts.length; index++) {
            if (!carts[index].isChecked) {
                all = false;
                break;
            }
        }
        setIsAllChecked(all)
    }

    const deleteCourse = () => {
        Alert.alert(
            'Title',
            'Message',
            [
                { text: 'Button', onPress: () => console.log('Button pressed') },
            ],
            {
                backgroundColor: '#000',
                color: 'white',
            },
        );
    }

    return (
        <View className="flex-row border border-gray-700 p-2 mt-5 bg-[#1B212D] rounded-lg items-start "
            onPress={() => nav.navigate("CoursesDetail", { course: item })}>
            <View className="w-2/6 flex-row justify-between items-center">
                <Checkbox
                    value={isCheckedCourse}
                    onValueChange={() => {
                        check();
                    }}
                />
                <Image
                    source={{ uri: item.Image }}
                    className="w-20 h-20" />
            </View>
            <View className="w-4/6 ml-2 ">
                <TouchableOpacity>
                    <Text className="text-white text-lg font-semibold">{names(item.Name)}</Text>
                </TouchableOpacity>
                <Text className="text-gray-400 text-base">hfhf</Text>
                <Text className='text-white font-semibold text-base'>{formatPrice(item.Price)}</Text>
                <TouchableOpacity className="items-center ml-auto mr-5  w-14 "
                    onPress={() => deleteCourse()}>
                    <Text className="text-red-700 text-base font-bold">Xóa</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}