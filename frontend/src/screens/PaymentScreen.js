import { View, Text, TouchableOpacity, Image, FlatList, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import CoursesPayment from '../components/CoursesPayment';
import Toast from 'react-native-root-toast';
import axios from 'axios';
import { Url } from '../contexts/constants'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';

export default function PaymentScreen({ route }) {
    const payments = route.params.payments;
    const total = route.params.total;
    const nav = useNavigation();
    const { setWishLists,setCarts,setCoursePurchaseds} = useContext(AuthContext);
    const [paymentMethods, setPaymentMethods] = useState({ name: '', logo: '' });
    const [modalVisible, setModalVisible] = useState(false);
    const [paymentIds, setPaymentIds] = useState([]);
    const formatPrice = (num) => {
        if (num != null)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }

    const handlePayment = async () => {
        if (paymentMethods.name == '') {
            Toast.show('Chưa chọn phương thức thanh toán',
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
            try {
                const data = {
                    PayMentType: "MOMO",
                    MoneyTotal: total,
                    MoneyFinal: total,
                    Detail: paymentIds,
                }
                const res = await axios.post(`${Url}/order/createOrder`, data);
                if (res.data) {
                    PaymentSuccess(res.data._id);
                    nav.popToTop();
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const PaymentSuccess = async (orderId) => {
        try {
            const res = await axios.put(`${Url}/order/PaymentSuccessOrder/`+orderId);
            if(res.data){
                getCart();
                getWishList();
                getCoursePurchased();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getWishList = async () => {
        try {
            const result = await axios.get(`${Url}/user/getWishList`);
            if (result.data) {
                setWishLists(result.data)
                // console.log(result.data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const getCart = async () => {
        try {
            const result = await axios.get(`${Url}/user/getCart`);
            if (result.data) {
                setCarts(result.data)
                // console.log(result.data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const getCoursePurchased = async () => {
        try {
            const result = await axios.get(`${Url}/user/getCoursePurchased`);
            if (result.data) {
                setCoursePurchaseds(result.data)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        let list = [];
        payments.forEach((p) => {
            list.push(p._id);
        })
        setPaymentIds(list);
    }, [])

    return (
        <SafeAreaView className="bg-[#0A0909] flex-1">
            <FlatList
                className=" px-2"
                showsHorizontalScrollIndicator={false}
                data={payments}
                renderItem={({ item }) =>
                    <CoursesPayment
                        item={item}
                    />
                }
            />

            <View className="absolute bottom-0">
                <TouchableOpacity
                    className="bg-[#242F41] h-14 px-5 flex-row items-center border-b-2 border-gray-800 "
                    onPress={() => setModalVisible(true)}>
                    <View className="items-center flex-row w-5/6">
                        <MaterialIcons name="monetization-on" size={24} color="#1273FE" />
                        <Text className="text-white ml-3 text-base">
                            {paymentMethods.name != '' ? paymentMethods.name : 'Chọn phương thức thanh toán'}
                        </Text>
                    </View>
                    <View className='w-1/6b justify-center'>
                        <Image
                            source={paymentMethods.logo}
                            className="w-10 h-10 ml rounded-md"
                        />
                    </View>
                </TouchableOpacity>
                <View className="flex-row w-screen h-14 ">
                    <View className="bg-[#242F41] items-center justify-center w-6/12">
                        <Text className="text-gray-400 text-base font-medium">Tổng thanh toán</Text>
                        <Text className="text-[#1273FE] text-base font-medium">{total !== 0 ? formatPrice(total) : "0 đ"}</Text>
                    </View>
                    <TouchableOpacity className="bg-[#1273FE] items-center justify-center w-6/12"
                        onPress={() => handlePayment()}>
                        <Text className="text-white font-semibold text-lg">Thanh Toán</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
                animationType='fade'
                hardwareAccelerated>
                <View className="flex-1 justify-end mb-28 bg-[#00000099]" >
                    <View className="bg-[#1B212D] w-[100%] rounded-tl-lg rounded-tr-lg px-5 py-3">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-bold text-white">Phương thức thanh toán</Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}>
                                <Ionicons name="close-circle" size={25} color="#1273FE" />
                            </TouchableOpacity>
                        </View>
                        <View className="justify-center items-center mb-3">
                            <TouchableOpacity className="flex-row mt-5"
                                onPress={() => {
                                    setPaymentMethods({ name: 'Thanh toán bằng ví Momo', logo: require('../image/momo_icon_square_pinkbg_RGB.png') });
                                    setModalVisible(false);
                                }}>
                                <View className="items-center flex-row">
                                    <Text className="text-white ml-3 text-base">
                                        Thanh toán bằng ví MoMo
                                    </Text>
                                </View>
                                <View className='justify-start ml-5'>
                                    <Image
                                        source={require('../image/momo_icon_square_pinkbg_RGB.png')}
                                        className="w-10 h-10 ml rounded-md" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row mt-5"
                                onPress={() => {
                                    setPaymentMethods({ name: 'Thanh toán bằng ZaloPay', logo: require('../image/ZaloPay-vuong.png') });
                                    setModalVisible(false);
                                }}>
                                <View className="items-center flex-row">
                                    <Text className="text-white ml-3 text-base">
                                        Thanh toán bằng ZaloPay
                                    </Text>
                                </View>
                                <View className='justify-start ml-5'>
                                    <Image
                                        source={require('../image/ZaloPay-vuong.png')}
                                        className="w-10 h-10 ml rounded-md" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}