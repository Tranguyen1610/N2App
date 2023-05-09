import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Rating } from 'react-native-ratings'
import moment from 'moment';
import 'moment/locale/vi';
import axios from 'axios';
import { Url } from '../contexts/constants'
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';

export default function Comment({ item }) {
    const [reply, setReply] = useState(undefined);
    const { userInfo } = useContext(AuthContext);
    const [mode, setMode] = useState("");
    const [isReply, setIsReply] = useState(false);
    const [content,setContent] = useState("");
    const getReply = async () => {
        try {
            const res = await axios.get(`${Url}/comment/` + item._id + '/getreply');
            // console.log(res.data[0]);
            if (res.data[0]) {
                setReply(res.data[0])
            }
        } catch (err) {
            console.log(err);
        }
    }
    const getMode = async () => {
        setMode(await AsyncStorage.getItem('mode'));
    }
    const handelReply = async () => {
        if (content === "")
            Toast.show('Bạn chưa nhập nội dung',
                {
                    backgroundColor: '#3B404F',
                    textColor: '#ffffff',
                    opacity: 1,
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    animation: true,
                })
        else
            try {
                const data = {
                    content: content,
                    courseId: item.Course._id,
                    commentId: item._id,
                }
                const res = await axios.post(`${Url}/comment/reply`, data);
                if (res.data) {
                    getReply();
                    setIsReply(false);
                    setTimeout(() => {
                        Toast.show('Thành công',
                            {
                                backgroundColor: '#3B404F',
                                textColor: '#ffffff',
                                opacity: 1,
                                duration: Toast.durations.SHORT,
                                position: Toast.positions.CENTER,
                                animation: true,
                            })
                    }, 500);
                }
                // console.log(res.data);
            } catch (err) {
                console.log(err);
            }
    }
    useEffect(() => {
        getReply();
        getMode();
    })
    return (
        <View className="mt-5">
            <Text className="text-white text-base font-medium">
                {item.Sender._id === userInfo._id ? 'Bạn' : item.Sender.Name}</Text>
            <View className="flex-row items-end mt-1">
                <Rating
                    className="items-start"
                    ratingCount={5}
                    imageSize={17}
                    tintColor='#0A0909'
                    readonly
                    startingValue={item.NumberOfStarts}
                />
                <Text className="text-gray-500 ml-5">{moment(item.createdAt).fromNow()}</Text>
            </View>
            <Text className="text-base text-gray-300 mt-1">
                {item.Content ? item.Content : 'Học viên không viết  gì cả.'}</Text>

            {reply ?
                <View className="mt-2 ml-5">
                    <View className="flex-row">
                        <Text className="text-[#1273FE] text-base font-medium">{reply.Sender._id === userInfo._id ? 'Bạn' : reply.Sender.Name}</Text>
                        <Text className=" text-gray-500 text-base ml-3">Tác giả</Text>
                    </View>
                    <Text className="text-gray-500 mt-1">Đã trả lời {moment(reply.createdAt).fromNow()}</Text>
                    <Text className="text-base text-gray-300 mt-1">{reply.Content}</Text>
                </View> : <></>}
            {mode === "Teacher" && !reply ?
                <TouchableOpacity className="flex-row justify-end"
                    onPress={() => {
                        setIsReply(!isReply);
                    }}>
                    <Text className="text-white bg-[#1273FE] p-1 rounded-md">{isReply ? "Đóng" : "Phản hồi"}</Text>
                </TouchableOpacity>
                : <></>}
            {isReply?
                <View className="flex-row justify-center mt-3">
                    <View className="text-white text-base p-2 border border-gray-700 w-[90%] rounded-2xl">
                        <TextInput
                            autoFocus={true}
                            multiline={true}
                            numberOfLines={1}
                            placeholder='Nội dung'
                            value={content}
                            onChangeText={(value) => setContent(value)}
                            placeholderTextColor={'#7F889A'}
                            className="text-white text-base px-2" />
                    </View>
                    <TouchableOpacity className="w-[10%] justify-center items-end"
                        onPress={() => handelReply()}>
                        <Ionicons name="send" size={28} color="#1273FE" />
                    </TouchableOpacity>
                </View> : <></>
            }
        </View>
    )
}