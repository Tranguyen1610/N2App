import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { CoursesWL } from '../contexts/Data'
import CoursesCart from '../components/CoursesCart'
import { AuthContext } from '../contexts/AuthContext';

export default function CardScreen() {
    const { userInfo } = useContext(AuthContext);
    const [carts, setCarts] = useState([]);
    const [total, setTotal] = useState(0);
    const [isAllChecked, setIsAllChecked] = useState(true);
    const flatListRef = useRef();

    const [isloading, setIsLoading] = useState(false);


    const formatPrice = (num) => {
        if (num!="")
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }

    const formartCart=()=>{
        const list=[];
        userInfo.Cart.forEach(cart=>{
            list.push({
                _id:cart._id,
                Name:cart.Name,
                Image:cart.Image,
                Teacher:cart.Teacher,
                Price: cart.Price,
                isChecked:true 
            })
        })
        setCarts(list);
        // console.log(list);
    }

    useEffect(() => {
        formartCart()
    }, [])

    const checkAll=()=>{
        setIsAllChecked(!isAllChecked);
        carts.forEach((cart)=>cart.isChecked=!isAllChecked);
        // setCarts(newCarts);   
    }

    return (
        <SafeAreaView className="bg-[#0A0909] flex-1">
            <FlatList
                extraData={carts}
                ref={flatListRef}
                className=" px-2"
                showsHorizontalScrollIndicator={false}
                data={carts}
                renderItem={({ item }) =>
                    <CoursesCart
                        item={item}
                        carts={carts}
                        setCarts={setCarts} 
                        setIsAllChecked={setIsAllChecked}
                        setTotal={setTotal}
                        />
                }
            />
            <View className="absolute bottom-0 flex-row w-screen h-14 ">
                <View className="bg-[#242F41] items-center justify-center w-3/12 flex-row border-r-2 border-gray-800">
                    <Checkbox
                        value={isAllChecked}
                        onValueChange={()=>checkAll()}
                    />
                    <Text className="text-base ml-2 text-gray-400" >Tất cả</Text>
                </View>
                <View className="bg-[#242F41] items-center justify-center w-5/12">
                    <Text className="text-gray-400 text-base font-medium">Tổng thanh toán</Text>
                    <Text className="text-[#1273FE] text-base font-medium">{total!==0? formatPrice(total):"0 đ"}</Text>
                </View>
                <TouchableOpacity className="bg-[#1273FE] items-center justify-center w-4/12">
                    <Text className="text-white font-semibold text-xl">Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}