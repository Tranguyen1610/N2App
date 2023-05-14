import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as VideoThumbnails from 'expo-video-thumbnails';

export default function VideoLearning({ item }) {
  const nav = useNavigation();
  const [image, setImage] = useState(null);
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
        <View className="w-1/3">
          <Image
            source={{ uri: image }}
            className="w-24 h-24 rounded-sm" />
        </View>
        <View className="w-2/3">
          <Text className="text-white text-lg font-medium" numberOfLines={2}>{item.Name}</Text>
          <Text className="text-gray-200 text-base">{item.Description}</Text>
        </View>
      </View>

    </TouchableOpacity>
  )
}