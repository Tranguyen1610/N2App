import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function HeaderTitle({ name, title, isBack,nav}) {
    return (
        <View className="flex-row items-center justify-center border-b border-gray-500 w-screen h-14 px-5">
            <View className="w-10/12 flex-row">
                {name == "SearchScreen" ?
                    <View className="flex-row p-2 bg-gray-500 rounded-md">
                        <View className="w-1/12">
                            <Ionicons name="search" size={24} color="white" />
                        </View>
                        <TextInput className=" w-11/12 text-base px-2 text-white" placeholder='Tìm kiếm'>
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
            <View className="w-2/12 items-end">
                <Ionicons name="cart-outline" size={30} color="white" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})