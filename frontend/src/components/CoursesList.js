import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Rating } from 'react-native-ratings';
import { useNavigation } from "@react-navigation/native";

export default function CoursesList({ item}) {
    const nav = useNavigation();
    
    const formatNumStart = (num) => {
        return num.toFixed(1);
    }
    const formatPrice = (num) => {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
    }
    return (
        <TouchableOpacity className="w-screen flex-row border-b border-gray-700 p-5"
            onPress={()=>nav.navigate("CoursesDetail",{course:item})}
            >
            <View className="w-1/4">
            <Image
                source={{ uri: item.image }}
                className="w-20 h-20" />
            </View>
            <View className="w-3/4 ml-2">
                <Text className="text-white text-lg font-semibold">{item.name}</Text>
                <Text className="text-gray-400 text-base">{item.lecturers}</Text>
                <View
                    className="flex-row">
                    <Text className="text-[#f1c40f] mr-2 font-medium"> {formatNumStart(item.numStar)}</Text>
                    <Rating
                        ratingCount={5}
                        imageSize={20}
                        tintColor='#0A0909'
                        readonly
                        startingValue={item.numStar}
                    />
                    <Text className="text-gray-500 ml-4">({item.numRating})</Text>
                </View>
                <Text className='text-white font-semibold text-base'>{formatPrice(item.price)}</Text>
            </View>
        </TouchableOpacity>
    )
}