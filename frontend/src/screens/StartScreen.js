import { View, Text, Image, ActivityIndicator, StatusBar } from 'react-native'
import React from 'react'
export default function StartScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-[#043b6a]">
            <StatusBar backgroundColor={"#043b6a"} />
            <Image
                source={require('../image/icon.png')}
                style={{width:300,height:300}} 
                />
            <ActivityIndicator size={'large'} color='#51CCEE'  className="bottom-10 absolute"/>
        </View>
    )
}