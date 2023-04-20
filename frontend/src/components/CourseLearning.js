import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-native-ratings';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { Url } from '../contexts/constants'

export default function CourseLearning({ item }) {
    const nav = useNavigation();
    const [numStarAVG, setNumStarAVG] = useState(0);
    const [numCmt, setNumCmt] = useState(0);

    const formatNumStart = (num) => {
        if (num != 0)
            return num.toFixed(1);
        else return "0";
    }
    const formatPrice = (num) => {
        if (num!="")
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }

    const names = (m) => {
        if (m != null) {
            if (m.length <= 40)
                return m
            else
                return m.slice(0, 36) + '...'
        }
        return ""
    }

    const getComments = async () => {
        try {
            const res = await axios.get(`${Url}/comment/` + item._id);
            //   console.log(res.data);
            const listcmt = res.data;
            if (listcmt.length > 0) {
                setNumCmt(listcmt.length);
                let total = 0;
                listcmt.forEach(c => {
                    total = total + c.NumberOfStarts;
                })
                setNumStarAVG(total / listcmt.length);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getComments();
    }, [])

    return (
        <TouchableOpacity className="w-screen flex-row border-b border-gray-700 p-5"
            onPress={() => nav.navigate("CoursesDetail", { course: item })}
        >
            <View className="w-1/4">
                <Image
                    source={{ uri: item.Image }}
                    className="w-20 h-20" />
            </View>
            <View className="w-3/4 ml-2">
                <Text className="text-white text-lg font-semibold">{names(item.Name)}</Text>
                <Text className="text-gray-400 text-base">{item.Teacher.Name}</Text>
                <View
                    className="flex-row">
                    <Text className="text-[#f1c40f] mr-2 font-medium"> {formatNumStart(numStarAVG)}</Text>
                    <Rating
                        ratingCount={5}
                        imageSize={20}
                        tintColor='#0A0909'
                        readonly
                        startingValue={numStarAVG}
                    />
                    <Text className="text-gray-500 ml-4">({numCmt})</Text>
                </View>
                <Text className='text-white font-semibold text-base'>{formatPrice(item.Price)}</Text>
            </View>
        </TouchableOpacity>
    )
}