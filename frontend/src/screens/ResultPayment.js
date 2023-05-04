import { View, Text, StatusBar, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { Url } from '../contexts/constants'

export default function ResultPayment({ route }) {
  const result = route.params.result;
  const order = route.params.orderdl;
  const nav = useNavigation();
  const [orderS,setOrderS]= useState(order);
  const { setCoursePurchaseds,setListOrderSuccess,setListOrderUnPaid } = useContext(AuthContext);

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
  const getOrderSuccess = async () => {
    try {
      const result = await axios.get(`${Url}/order/getOrderSuccess`);
      if (result.data) {
        setListOrderSuccess(result.data)
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const PaymentSuccess = async (orderId) => {
    try {
      const res = await axios.put(`${Url}/order/PaymentSuccessOrder/` + orderId);
      if (res.data) {
        getCoursePurchased();
        getOrderUnPaid();
        getOrderSuccess();
        setOrderS(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(()=>{
    if(result)
      PaymentSuccess(order._id);
  },[order,result])
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1 items-center">
      <StatusBar backgroundColor={"#0A0909"} />
      {result ?
        <View className="mt-10 items-center">
          <Image source={require("../image/check.png")}
            className="w-28 h-28" />
          <Text className="text-white mt-5 text-xl">Thanh toán thành công</Text>
          <Text className="text-gray-300 mt-5 text-center px-5 text-sm">Đơn hàng của bạn đã được thanh toán thành công. Bạn có thể học tập ngay bây giờ.</Text>
        </View> :
        <View className="mt-10 items-center">
          <Image source={require("../image/remove.png")}
            className="w-28 h-28" />
          <Text className="text-white mt-5 text-xl">Thanh toán thất bại</Text>
          <Text className="text-gray-300 mt-5 text-center px-5 text-sm">Bạn chưa thanh toán hoặc thanh toán đơn hàng thất bại. Bấm xem chi tiết để xem thông tin đơn hàng và có thể thanh toán lại hoặc hủy đơn hàng này.</Text>
        </View>}
      <View className='mt-5'>
        <TouchableOpacity
          onPress={() => {
            // nav.navigate('HomeNavigator',{screen:'AccountSceeen'})
            nav.navigate('HomeNavigator');
          }}>
          <Text className="text-[#1273FE] p-2 text-base font-semibold text-center">Về trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            nav.navigate('OrderDetailScreen', { order: orderS })}>
          <Text className="text-[#1273FE] p-2 text-base font-semibold text-center">Xem chi tiết đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}