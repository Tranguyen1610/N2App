import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as VideoThumbnails from 'expo-video-thumbnails';

export default function VideoLearning({ item }) {
    const nav = useNavigation();
    const [image, setImage] = useState(null);
    // const names = (m) => {
    //     if (m != null) {
    //         if (m.length <= 40)
    //             return m
    //         else
    //             return m.slice(0, 36) + '...'
    //     }
    //     return ""
    // }
    const generateThumbnail = async () => {
        try {
          const { uri } = await VideoThumbnails.getThumbnailAsync(
            item.LinkVideo,
            {
              time: 15000,
            }
          );
          setImage(uri);
        } catch (e) {
          console.warn(e);
        }
      };
      useEffect(() => {
       generateThumbnail();
      }, [])
      
    return (
        <TouchableOpacity className='mt-5 bg-[#1B212D] rounded-sm px-5 py-3'
            onPress={() =>
                nav.navigate("VideoPreviewScreen", { link: item.LinkVideo })
            }>
            <View className='flex-row justify-start  items-center'>
                <Image
                    source={{ uri: image }}
                    className="w-24 h-24 rounded-sm" />
                <View className='ml-3'>
                    <Text className="text-white text-lg font-medium">{item.Name}</Text>
                    <Text className="text-gray-200 text-base">{item.Description}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}