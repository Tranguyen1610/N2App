import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function PaymentMethod({ item, setPaymentMethod, setModalVisible }) {
    return (
        <TouchableOpacity className="flex-row mt-5"
            onPress={() => {
                setPaymentMethod(item);
                setModalVisible(false);
            }}
            >
            <View className="items-center flex-row">
                <Text className="text-white mr-5 text-base">
                    {item.Description}
                </Text>
            </View>
            <View className='justify-start ml-auto'>
                <Image
                    source={{ uri: item.Logo }}
                    className="w-10 h-10 ml rounded-md" />
            </View>
        </TouchableOpacity>
    )
}