import { View, Text, StatusBar, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Url } from '../contexts/constants';
import MCA from '../components/MCA';

export default function TransactionHistoryScreen() {
  const [ historyMCA, setHistoryMCA ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getHistoryMCA = async () => {
    try {
      const result = await axios.get(`${Url}/user/historyMCA`);
      if (result.data) {
        const list = result.data.user.HistoryMCA;
        setHistoryMCA([...list].reverse());
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500)
    getHistoryMCA();
  }, [])
  return (
    <View className="flex-1 bg-[#0A0909] p-2">
      <StatusBar backgroundColor={"#0A0909"}/>
      {isLoading ?
        <View className="bg-[#0A0909] flex-1 justify-center items-center">
          <ActivityIndicator size={'large'} color={'#1273FE'} />
        </View> :
        <View>
          {historyMCA.length == 0 ?
            <Text className="text-gray-300 text-xl text-center mt-20">
              Chưa có lịch sử</Text> : <></>}
          <FlatList
            className=" px-2"
            showsHorizontalScrollIndicator={false}
            data={historyMCA}
            renderItem={({ item }) =>
              <MCA
                item={item}/>
            }
          />
        </View>}
    </View>
  )
}