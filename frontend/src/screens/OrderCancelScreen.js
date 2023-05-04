import { View, Text, FlatList, ActivityIndicator, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Order from '../components/Order'
import axios from 'axios';
import { Url } from '../contexts/constants'
import { AuthContext } from '../contexts/AuthContext';

export default function OrderCancelScreen() {
  const {listOrderCancel, setListOrderCancel} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    getOrderCancel();
  }, [])
  return (
    <View className="flex-1 bg-[#0A0909] p-2">
      <StatusBar backgroundColor={"#0A0909"}/>
      {listOrderCancel.length == 0 ?
        <Text className="text-gray-300 text-xl text-center mt-20">
          Chưa có đơn hàng</Text> : <></>}
      <FlatList
        className=" px-2"
        showsHorizontalScrollIndicator={false}
        data={listOrderCancel}
        renderItem={({ item }) =>
          <Order
            item={item}
            setIsLoading={setIsLoading}
          />
        }
      />
    </View>
  )
}