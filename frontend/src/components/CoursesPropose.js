import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Url } from '../contexts/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CoursesPropose({ item }) {
    const nav = useNavigation();
    const [numStarAVG, setNumStarAVG] = useState(0);
    const [numCmt, setNumCmt] = useState(0);
    const [mode, setMode] = useState("");

    const formatNumStart = (num) => {
        if (num != 0)
            return num.toFixed(1);
        else return "0";
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

    const formatPrice = (num) => {
        if (num!=null)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }
    const getMode = async()=>{
        setMode(await AsyncStorage.getItem('mode'));
    }

    useEffect(() => {
        getComments();
        getMode();
    }, [])
    return (
        <TouchableOpacity className="bg-[#1B212D] mr-5 w-56 p-3 rounded-md"
            onPress={() => {
                nav.navigate(mode==="Teacher"?"CoursesDetailTeacher":"CoursesDetail", { course: item })
                }}>
            <Image
                source={{ uri: item.Image }}
                className="w-max h-28" />
            <Text className="text-white text-lg font-semibold h-14" numberOfLines={2}>{item.Name}</Text>
            <Text className="text-gray-400 text-base">{item.Teacher.Name}</Text>
            <View
                className="flex-row">
                <Text className="text-[#f1c40f] mr-2 font-medium"> {formatNumStart(numStarAVG)}</Text>
                <Rating
                    ratingCount={5}
                    imageSize={20}
                    tintColor='#1B212D'
                    readonly
                    startingValue={numStarAVG}
                />
                <Text className="text-gray-500 ml-4">({numCmt})</Text>
            </View>
            <Text className='text-white font-semibold text-base'>{formatPrice(item.Price)}</Text>
        </TouchableOpacity>
    )
}