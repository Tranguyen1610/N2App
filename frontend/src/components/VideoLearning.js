import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function VideoLearning({ item }) {
    const nav = useNavigation();
    // const names = (m) => {
    //     if (m != null) {
    //         if (m.length <= 40)
    //             return m
    //         else
    //             return m.slice(0, 36) + '...'
    //     }
    //     return ""
    // }
    return (
        <TouchableOpacity className='mt-5 bg-[#1B212D] rounded-sm px-5'
            onPress={() =>
                nav.navigate("VideoPreviewScreen", { link: item.LinkVideo })
            }>
            <View className='flex-row justify-start items-center'>
                <Image
                    source={require('../image/video.png')}
                    className="w-24 h-24 mt-5 rounded-md" />
                <View className='ml-3'>
                    <Text className="text-white text-lg font-medium">{item.Name}</Text>
                    <Text className="text-gray-200 text-base">{item.Description}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}