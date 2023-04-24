import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Order from '../components/Order'
import axios from 'axios';
import { Url } from '../contexts/constants'
import { AuthContext } from '../contexts/AuthContext';

export default function OrderUnpaidScreen() {
  const { listOrderUnPaid, setListOrderUnPaid } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    getOrderUnPaid();
  }, [])
  return (
    <View className="flex-1 bg-[#0A0909] p-2">
      {isLoading ?
        <View className="bg-[#0A0909] flex-1 justify-center items-center">
          <ActivityIndicator size={'large'} color={'#1273FE'} />
        </View> :
        <View>
          {listOrderUnPaid.length == 0 ?
            <Text className="text-gray-300 text-xl text-center mt-20">
              Chưa có đơn hàng</Text> : <></>}
          <FlatList
            className=" px-2"
            showsHorizontalScrollIndicator={false}
            data={listOrderUnPaid}
            renderItem={({ item }) =>
              <Order
                item={item}
                setIsLoading={setIsLoading}
              />
            }
          />
        </View>}
    </View>
  )
}