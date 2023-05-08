import { View, Text, TouchableOpacity, Image, FlatList, Modal, StatusBar, NativeEventEmitter, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import CoursesPayment from '../components/CoursesPayment';
import Toast from 'react-native-root-toast';
import axios from 'axios';
import { Url } from '../contexts/constants'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import PaymentMethod from '../components/PaymentMethod';
import { StripeProvider } from "@stripe/stripe-react-native";
import NumberFormat from "react-number-format";
import { useStripe } from "@stripe/stripe-react-native";

import { NativeModules } from 'react-native';
import CryptoJS from 'crypto-js';


const { PayZaloBridge } = NativeModules;

const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

const subscription = payZaloBridgeEmitter.addListener('EventPayZalo', data => {
    console.log(data.rereturnCode);
    if (data.returnCode === 1) {
        Alert.alert('Pay success!');
    } else {
        Alert.alert('Pay errror! ' + data.returnCode);
    }
    console.log(data);
});

export default function PaymentScreen({ route }) {
    const payments = route.params.payments;
    const total = route.params.total;
    const nav = useNavigation();
    const { setWishLists, setCarts, setCoursePurchaseds } = useContext(AuthContext);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [paymentIds, setPaymentIds] = useState([]);

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    //Stripe
    const payment = async (order) => {
        try {
            const response = await fetch(`${Url}/payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: total,
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

    //demo
    const [token, setToken] = useState('');
    const [returncode, setReturnCode] = useState('');

    const formatPrice = (num) => {
        if (num != null)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }

    const handlePayment = async () => {
        if (!paymentMethod) {
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
            if (total <= 20000) {
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
            else
                try {
                    const data = {
                        PayMentType: paymentMethod._id,
                        MoneyTotal: total,
                        MoneyFinal: total,
                        Detail: paymentIds,
                    }
                    const res = await axios.post(`${Url}/order/createOrder`, data);
                    if (res.data) {
                        // PaymentSuccess(res.data._id);
                        // nav.popToTop();
                        getCart();
                        getWishList();
                        if (paymentMethod.Name === 'ZaloPay')
                            payOrder(total)
                        else
                                if (paymentMethod.Name === 'Stripe')
                                    payment(res.data);
                    }
                } catch (err) {
                    console.log(err);
                }
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

    const getPaymentMethod = async () => {
        try {
            const result = await axios.get(`${Url}/paymentMedthod`);
            if (result.data) {
                setPaymentMethods(result.data)
                // console.log(result.data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPaymentMethod();
        let list = [];
        payments.forEach((p) => {
            list.push(p._id);
        })
        setPaymentIds(list);
    }, [])


    //zalo
    function getCurrentDateYYMMDD() {
        var todayDate = new Date().toISOString().slice(2, 10);
        return todayDate.split('-').join('');
    }

    async function payOrder(money) {
        let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime();

        let appid = 2553;
        let amount = parseInt(money);
        let appuser = 'ZaloPayDemo';
        let apptime = new Date().getTime();
        let embeddata = '{}';
        let item = '[]';
        let description = 'Thanh toán hóa đơn N2App #' + apptransid;
        let hmacInput =
            appid +
            '|' +
            apptransid +
            '|' +
            appuser +
            '|' +
            amount +
            '|' +
            apptime +
            '|' +
            embeddata +
            '|' +
            item;
        let mac = CryptoJS.HmacSHA256(
            hmacInput,
            'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
        );
        console.log('====================================');
        console.log('hmacInput: ' + hmacInput);
        console.log('mac: ' + mac);
        console.log('====================================');
        var order = {
            app_id: appid,
            app_user: appuser,
            app_time: apptime,
            amount: amount,
            app_trans_id: apptransid,
            embed_data: embeddata,
            item: item,
            description: description,
            mac: mac,
        };

        // console.log(order);

        let formBody = [];
        for (let i in order) {
            var encodedKey = encodeURIComponent(i);
            var encodedValue = encodeURIComponent(order[i]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        await fetch('https://sb-openapi.zalopay.vn/v2/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: formBody,
        })
            .then(response => response.json())
            .then(resJson => {
                setToken(resJson.zp_trans_token);
                setReturnCode(resJson.return_code);
                var payZP = NativeModules.PayZaloBridge;
                payZP.payOrder(resJson.zp_trans_token);
            })
            .catch(error => {
                console.log('error ', error);
            });
    }


    return (
        <StripeProvider
            publishableKey="pk_test_51N2yxYFoJ1QfXh83YViTJvMZD61nmNgrkgeKcP6tSWTfRKx2FWCTDFgZztq7QhmjncRi2iGRaZLmgevSAdZN4IWt00iVDlAIe3">
            <SafeAreaView className="bg-[#0A0909] flex-1">
                <StatusBar backgroundColor={"#0A0909"} />
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
                                {paymentMethod ? paymentMethod.Description : 'Chọn phương thức thanh toán'}
                            </Text>
                        </View>
                        <View className='w-1/6 justify-center'>
                            {paymentMethod ?
                                <Image
                                    source={{ uri: paymentMethod.Logo }}
                                    className="w-10 h-10 ml rounded-md"
                                /> : <></>}
                        </View>
                    </TouchableOpacity>
                    <View className="flex-row w-screen h-14 ">
                        <View className="bg-[#242F41] items-center justify-center w-6/12">
                            <Text className="text-gray-400 text-base font-medium">Tổng thanh toán</Text>
                            <Text className="text-[#1273FE] text-base font-medium">{total !== 0 ? formatPrice(total) : "0 đ"}</Text>
                        </View>
                        <TouchableOpacity className="bg-[#1273FE] items-center justify-center w-6/12"
                            onPress={() => {
                                handlePayment()
                            }}>
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
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    data={paymentMethods}
                                    renderItem={({ item }) =>
                                        <PaymentMethod
                                            item={item}
                                            setPaymentMethod={setPaymentMethod}
                                            setModalVisible={setModalVisible}
                                        />
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </StripeProvider>
    )
}