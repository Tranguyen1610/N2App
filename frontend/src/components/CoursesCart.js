import { View, Text, TouchableOpacity, Image, Alert, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from 'react-native-ratings';
import { useNavigation } from "@react-navigation/native";
import Checkbox from 'expo-checkbox';
import Toast from 'react-native-root-toast';
import axios from 'axios';
import { Url } from '../contexts/constants'
import { AuthContext } from '../contexts/AuthContext';

export default function CoursesCart({ item, carts, setCCarts, setTotal, setIsAllChecked }) {
    const nav = useNavigation();
    const [isCheckedCourse, setIsCheckedCourse] = useState(item.isChecked);
    const [modalVisible, setModalVisible] = useState(false);
    const {  setCarts } = useContext(AuthContext);


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

    const deleteCourse = async() => {
        try {
            const res = await axios.put(`${Url}/user/deleteCart/` + item._id);
            // console.log(res.data.ListVideo);
            if (res.data) {
                const result = await axios.get(`${Url}/user/getCart`);
                if (result.data) {
                    setCarts(result.data)
                }
                Toast.show('Thành công',
                    {
                        backgroundColor: '#3B404F',
                        textColor: '#ffffff',
                        opacity: 1,
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        animation: true,
                    })
            }
            // console.log(res.data);
        } catch (err) {
            console.log(err);
            Toast.show('Thất bại',
                {
                    backgroundColor: '#3B404F',
                    textColor: '#ffffff',
                    opacity: 1,
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    animation: true,
                })
        }
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
                <Text className="text-white text-lg font-semibold" numberOfLines={2}>{item.Name}</Text>
            </TouchableOpacity>
            <Text className="text-gray-400 text-base">hfhf</Text>
            <Text className='text-white font-semibold text-base'>{formatPrice(item.Price)}</Text>
            <TouchableOpacity className="items-center ml-auto mr-5  w-14 "
                onPress={() => setModalVisible(true)}>
                <Text className="text-red-700 text-base font-bold">Xóa</Text>
            </TouchableOpacity>
        </View>
        <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
            animationType='fade'
            hardwareAccelerated>
            <View className="flex-1 justify-center items-center bg-[#00000099]" >
                <View className="bg-[#1B212D] w-[90%] rounded-lg">
                    <Text className=" p-3 text-lg font-bold text-white">Thông báo</Text>
                    <View>
                        <View className="mt-2 ml-5 items-start">
                            <Text className="text-base text-white">Bạn có chắc chắn xóa khỏi giỏ hàng?</Text>
                        </View>
                        <View className="flex-row p-5 justify-end">
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}>
                                <Text
                                    className="text-base text-white"
                                >Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    deleteCourse();
                                }}>
                                <Text className="text-base text-[#1273FE] ml-5"
                                >Xoá</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
)
}