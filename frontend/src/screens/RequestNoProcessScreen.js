import { View, Text, FlatList, ActivityIndicator, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Url } from '../contexts/constants'
import Order from '../components/Order';
import { AuthContext } from '../contexts/AuthContext';
import Request from '../components/Request';

export default function RequestAcceptScreen() {
  const { listRequestNoAccept, setListRequestNoAccept } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const getRequestNoAccept = async () => {
    try {
      const result = await axios.get(`${Url}/request/getRequestByTeacherNoAccept`);
      if (result.data) {
        setListRequestNoAccept(result.data)
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500)
    getRequestNoAccept();
  }, [])

  return (
    <View className="flex-1 bg-[#0A0909] p-2">
      <StatusBar backgroundColor={"#0A0909"}/>
      {isLoading ?
        <View className="bg-[#0A0909] flex-1 justify-center items-center">
          <ActivityIndicator size={'large'} color={'#1273FE'} />
        </View> :
        <View>
          {listRequestNoAccept.length == 0 ?
            <Text className="text-gray-300 text-xl text-center mt-20">
              Chưa có yêu cầu</Text> : <></>}
          <FlatList
            className=" px-2"
            showsHorizontalScrollIndicator={false}
            data={listRequestNoAccept}
            renderItem={({ item }) =>
              <Request
                item={item}
                // setIsLoading={setIsLoading}
              />
            }
          />
        </View>}
    </View>
  )
}