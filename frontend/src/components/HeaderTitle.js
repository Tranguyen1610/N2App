import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import CardScreen from '../screens/CardScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { Url } from '../contexts/constants'

export default function HeaderTitle({ name, title, isBack }) {
    const nav = useNavigation();
    const [numCart, setnumCart] = useState(0);
    const [mode, setMode] = useState();
    const { textSearch, setTextSearch,carts, setCarts } = useContext(AuthContext);

    const getMode = async () => {
        const mode = await AsyncStorage.getItem('mode');
        setMode(mode)
    }
    useEffect(()=>{
        if (carts.length == 0) getCart();
        setnumCart(carts.length)
        getMode()
    },[])

    useEffect(()=>{
        setnumCart(carts.length)
    },[carts])


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

    return (
        <View className="flex-row items-center justify-center w-screen h-14 px-5">
            <View className="w-10/12 flex-row">
                {name == "SearchScreen" ?
                    <View className="flex-row p-2 bg-gray-500 rounded-md">
                        <View className="w-1/12">
                            <Ionicons name="search" size={24} color="white" />
                        </View>
                        <TextInput 
                            className=" w-11/12 text-base px-2 text-white" 
                            placeholder='Tìm kiếm'
                            value={textSearch}
                            onChangeText={(e)=>setTextSearch(e)}>
                        </TextInput>
                    </View> : <></>}
                {isBack ?
                    <View className="flex-row">
                        <TouchableOpacity
                            className="mr-5"
                            onPress={() => nav.goBack()}>
                            <Ionicons name="arrow-back-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View> : <></>}
                {title.length != 0 ?
                    <Text className="text-lg text-white font-bold ">{title}</Text> : <></>}
            </View>
            {mode !== "Teacher" ?
                <TouchableOpacity className="w-2/12 items-center flex-row"
                    onPress={() =>
                        nav.navigate("CardScreen")
                    }>
                    <Ionicons name="cart-outline" size={30} color="white" />
                    {numCart != 0 ?
                        <View className="justify-center items-center rounded-full w-5 h-5 bg-[#1273FE] absolute bottom-4 right-5 ">
                            <Text className="text-white font-bold text-xs ">{numCart < 10 ? numCart : "9+"}</Text>
                        </View> : <></>}
                </TouchableOpacity> : <View className="w-2/12"></View>}
        </View>
    )
}

const styles = StyleSheet.create({})