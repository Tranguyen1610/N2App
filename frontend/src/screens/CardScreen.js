import {FlatList,StatusBar,Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import CoursesCart from '../components/CoursesCart'
import { AuthContext } from '../contexts/AuthContext';
import Toast from 'react-native-root-toast';

export default function CardScreen() {
    const nav = useNavigation();
    const { userInfo, carts, setCarts } = useContext(AuthContext);
    const [Ccarts, setCCarts] = useState([]);
    const [total, setTotal] = useState(0);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const flatListRef = useRef();

    const [isloading, setIsLoading] = useState(false);


    const formatPrice = (num) => {
        if (num != null)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }

    const formartCart = () => {
        const list = [];
        carts.forEach(cart => {
            list.push({
                _id: cart._id,
                Name: cart.Name,
                Image: cart.Image,
                Teacher: cart.Teacher,
                Price: cart.Price,
                isChecked: false
            })
        })
        setCCarts(list);
        // console.log(list);
    }

    const handleOrder = () => {
        const coursePayments = [];
        Ccarts.map((c) => {
            if (c.isChecked)
                coursePayments.push(c);
        })
        if (coursePayments.length > 0)
            nav.navigate("PaymentScreen", { payments: coursePayments, total: total })
        else {
            Toast.show('Chưa chọn khóa học',
                {
                    backgroundColor: '#3B404F',
                    textColor: '#ffffff',
                    opacity: 1,
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    animation: true,
                })
        }
    }

    useEffect(() => {
        formartCart()
    }, [carts])

    const checkAll = () => {
        setIsAllChecked(!isAllChecked);
        carts.forEach((cart) => cart.isChecked = !isAllChecked);
        // setCarts(newCarts);   
    }

    return (
        <SafeAreaView className="bg-[#0A0909] flex-1">
            <StatusBar backgroundColor={"#0A0909"}/>
            {Ccarts.length == 0 ?
                <Text className="text-gray-300 text-xl text-center mt-20">
                    Giỏ hàng hiện tại rỗng</Text> : <></>}
            <FlatList
                extraData={Ccarts}
                ref={flatListRef}
                className=" px-2"
                showsHorizontalScrollIndicator={false}
                data={Ccarts}
                renderItem={({ item }) =>
                    <CoursesCart
                        item={item}
                        carts={Ccarts}
                        setCCarts={setCCarts}
                        setIsAllChecked={setIsAllChecked}
                        setTotal={setTotal}
                    />
                }
            />
            <View className="absolute bottom-0 w-screen h-14 flex-row">
                <View className="bg-[#242F41] items-center justify-center w-3/12 flex-row border-r-2 border-gray-800">
                    <Checkbox
                        value={isAllChecked}
                        onValueChange={() => checkAll()}
                    />
                    <Text className="text-base ml-2 text-gray-400" >Tất cả</Text>
                </View>
                <View className="bg-[#242F41] items-center justify-center w-5/12">
                    <Text className="text-gray-400 text-base font-medium">Tổng thanh toán</Text>
                    <Text className="text-[#1273FE] text-base font-medium">{total !== 0 ? formatPrice(total) : "0 đ"}</Text>
                </View>
                <TouchableOpacity className="bg-[#1273FE] items-center justify-center w-4/12"
                    onPress={() => handleOrder()}>
                    <Text className="text-white font-semibold text-lg">Mua</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}