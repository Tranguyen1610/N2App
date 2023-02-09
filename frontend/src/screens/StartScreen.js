import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'

export default function StartScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-[#043b6a]">
            <Image
                source={require('../image/Logo.png')} />
            <ActivityIndicator size={'large'}  className="bottom-10 absolute"/>
        </View>
    )
}