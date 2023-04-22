import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import CoursesPayment from '../components/CoursesPayment';

export default function PaymentScreen({ route }) {
    const payments = route.params.payments;
    const total = route.params.total;
    const [paymentMethods, setPaymentMethods] = useState([]);
    const formatPrice = (num) => {
        if (num != null)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }
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
                    className="bg-[#242F41] h-14 px-5 flex-row items-center border-b-2 border-gray-800 ">
                    <View className="items-center flex-row w-5/6">
                        <MaterialIcons name="monetization-on" size={24} color="#1273FE" />
                        <Text className="text-white ml-3">
                            {paymentMethods.length > 0 ? paymentMethods.name : 'Chọn phương thức thanh toán'}
                        </Text>
                    </View>
                    <View className='w-1/6b justify-center'>
                        {paymentMethods.length > 0 ?
                            <Image
                                source={require('../image/momo_icon_square_pinkbg_RGB.png')}
                                className="w-10 h-10 ml"
                            />:<></>}
                    </View>
                </TouchableOpacity>
                <View className="flex-row w-screen h-14 ">
                    <View className="bg-[#242F41] items-center justify-center w-3/12 flex-row border-r-2 border-gray-800">

                    </View>
                    <View className="bg-[#242F41] items-center justify-center w-5/12">
                        <Text className="text-gray-400 text-base font-medium">Tổng thanh toán</Text>
                        <Text className="text-[#1273FE] text-base font-medium">{total !== 0 ? formatPrice(total) : "0 đ"}</Text>
                    </View>
                    <TouchableOpacity className="bg-[#1273FE] items-center justify-center w-4/12"
                        onPress={() => handleOrder()}>
                        <Text className="text-white font-semibold text-lg">Thanh Toán</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}