import { View, Text, FlatList, Image, TouchableOpacity, StatusBar, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CoursesPayment from '../components/CoursesPayment';
import moment from 'moment';
import 'moment/locale/vi';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Url } from '../contexts/constants'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import { useStripe } from '@stripe/stripe-react-native';

export default function OrderDetailScreen({ route }) {
    const nav = useNavigation();
    const order = route.params.order;
    const { setListOrderCancel, setListOrderUnPaid } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

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
            const res = await axios.put(`${Url}/order/cancelOrder/` + order._id);
            if (res.data) {
                getOrderUnPaid();
                getOrderCancel();
                nav.goBack();
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
        } catch (err) {
            console.log(err);
        }
    }

    //Stripe
    const payment = async (order) => {
        try {
            const response = await fetch(`${Url}/payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: order.MoneyFinal,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                return Alert.alert(data.message);
            }
            const initSheet = await initPaymentSheet({
                appearance: {
                    colors: {
                        primary: '#1273FE',
                        background: '#242F41',
                        icon: '#1273FE',
                        primaryText: '#ffffff',
                        secondaryText: '#ffffff',
                    }
                },
                paymentIntentClientSecret: data.clientSecret,
                merchantDisplayName: "Thanh toán N2App",
            });
            if (initSheet.error) {
                // console.error(initSheet.error);
                //return Alert.alert(initSheet.error.message);
                return nav.navigate('ResultPayment', { result: false, orderdl: order });
            }
            const presentSheet = await presentPaymentSheet({
                // clientSecret: data.clientSecret
            });
            if (presentSheet.error) {
                // console.error(presentSheet.error);
                // return Alert.alert(presentSheet.error.message);
                return nav.navigate('ResultPayment', { result: false, orderdl: order });
            }
            else
                // Alert.alert("Payment successfully! Thank you for the purchase.");
                return nav.navigate('ResultPayment', { result: true, orderdl: order });
        } catch (err) {
            console.error(err);
            // Alert.alert("Payment failed!");
            return nav.navigate('ResultPayment', { result: false, orderdl: order });
        }
    };

    const handlePayment = async () => {
        if (order.MoneyFinal <= 20000) {
            Toast.show('Số tiền đơn hàng phải lớn hơn 20.000 đ',
                {
                    backgroundColor: '#3B404F',
                    textColor: '#ffffff',
                    opacity: 1,
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    animation: true,
                })
        }
        else {
            if (order.PayMentType.Name === 'ZaloPay')
                // payOrder(total)
                console.log("Chưa tích hợp");
            else
                if (order.PayMentType.Name === 'Stripe')
                    payment(order);
        }
    }


    useEffect(() => {
        // console.log(order);
    }, [])
    return (
        <View className="flex-1 bg-[#0A0909] p-5">
            <StatusBar backgroundColor={"#0A0909"} />
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
                                source={{ uri: order.PayMentType.Logo }}
                                className="w-10 h-10 ml rounded-md"
                            />
                        </View>
                    </View>
                </View>
                {!order.IsPayment && !order.IsCancel ?
                    <View className='flex-row justify-between'>
                        <TouchableOpacity className="bg-red-600 items-center justify-center mt-3 p-2 rounded-md w-[45%]"
                            onPress={() => setModalVisible(true)}
                        >
                            <Text className="text-white font-semibold text-lg">Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#1273FE] items-center justify-center mt-3 p-2 rounded-md w-[45%]"
                            onPress={() => handlePayment()}
                        >
                            <Text className="text-white font-semibold text-lg">Thanh Toán</Text>
                        </TouchableOpacity>
                    </View> : <></>}
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
        </View>
    )
}