import { View, Text, FlatList, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CoursesPayment from '../components/CoursesPayment';
import moment from 'moment';
import 'moment/locale/vi';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Url } from '../contexts/constants'
import { AuthContext } from '../contexts/AuthContext';

export default function Order({ item, setIsLoading }) {
    const {setListOrderCancel,setListOrderUnPaid} = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);

    const nav = useNavigation();

    const formatPrice = (num) => {
        if (num != null)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }

    const getOrderUnPaid = async () => {
        try {
            const result = await axios.get(`${Url}/order/getOrderUnPaid`);
            if (result.data) {
                setListOrderUnPaid(result.data)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const getOrderCancel = async () => {
        try {
          const result = await axios.get(`${Url}/order/getOrderCancel`);
          if (result.data) {
            setListOrderCancel(result.data)
          }
        }
        catch (err) {
          console.log(err);
        }
      }

    const handleCancelOrder = async () => {
        try {
            const res = await axios.put(`${Url}/order/cancelOrder/` + item._id);
            if (res.data) {
                setIsLoading(true);
                getOrderUnPaid();
                getOrderCancel();
                setTimeout(() => setIsLoading(false), 500);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
    }, [])



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
            {!item.IsPayment && !item.IsCancel ?
                <View className="mt-2 flex-row justify-end">
                    <TouchableOpacity className=""
                        onPress={() => setModalVisible(true)}
                    >
                        <Text className="text-white text-base text-center bg-red-600 p-2 rounded-md font-medium">Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className=" "
                    // onPress={() => handleComment()}
                    >
                        <Text className="text-base text-white text-center bg-[#1273FE] p-2 rounded-md font-medium ml-5">
                            Thanh toán
                        </Text>
                    </TouchableOpacity>
                </View> : <></>}
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
                                <Text className="text-base text-white">Bạn có chắc chắn hủy đơn hàng?</Text>
                            </View>
                            <View className="flex-row p-5 justify-end">
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}>
                                    <Text
                                        className="text-base text-white"
                                    >Đóng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleCancelOrder();
                                    }}>
                                    <Text className="text-base text-[#1273FE] ml-5"
                                    >Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    )
}