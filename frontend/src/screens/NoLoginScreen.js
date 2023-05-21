import { View, Text, StatusBar, Image, TouchableOpacity, FlatList, Slider, Animated } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import data from '../contexts/Data'
import SlideItem from '../components/SlideItem';
import Pagination from '../components/Pagination';
import { AuthContext } from '../contexts/AuthContext';

export default function NoLoginScreen() {
    const {setUseHide} = useContext(AuthContext);
    const nav = useNavigation();
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    // const [mode,setmode] = useState('node')
    const handleOnScroll = event => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(event);
    };

    const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
        // console.log('viewableItems', viewableItems);
        setIndex(viewableItems[0].index);
    }).current;

    return (
        <View className="flex-1 bg-[#0A0909] p-2 justify-center items-center">
            <StatusBar backgroundColor={"#0A0909"} />
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <SlideItem item={item} />}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                onViewableItemsChanged={handleOnViewableItemsChanged}
            />


            <View className="absolute bottom-0  ">
                <Pagination data={data} scrollX={scrollX} index={index} />
                <View className="flex-row w-screen h-14">
                    <TouchableOpacity className="bg-[#1273FE] items-center justify-center w-7/12 flex-row border-r border-gray-500 "
                        onPress={()=>setUseHide(true)}
                    >

                        <Text className="text-white font-semibold text-base ml-3">Duyệt với tư cách khách</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#1273FE] items-center justify-center w-5/12 flex-row"
                        onPress={() => nav.navigate('LoginScreen')}
                    >
                        <Text className="text-white font-semibold text-lg ml-3">Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}