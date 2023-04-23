import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from 'react-native-ratings'
import moment from 'moment';
import 'moment/locale/vi';
import axios from 'axios';
import { Url } from '../contexts/constants'
import { AuthContext } from '../contexts/AuthContext';

export default function Comment({ item }) {
    const [reply, setReply] = useState(undefined);
    const { userInfo} = useContext(AuthContext);
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
    useEffect(() => {
        getReply();
    })
    return (
        <View className="mt-5">
            <Text className="text-white text-base font-medium">
                {item.Sender._id===userInfo._id? 'Bạn':item.Sender.Name}</Text>
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
                {item.Content? item.Content:'Học viên không viết  gì cả.'}</Text>

            {reply ?
                <View className="mt-2 ml-5">
                    <View className="flex-row">
                        <Text className="text-[#1273FE] text-base font-medium">{reply.Sender.Name}</Text>
                        <Text className=" text-gray-500 text-base ml-3">Tác giả</Text>
                    </View>
                    <Text className="text-gray-500 mt-1">Đã trả lời {moment(reply.createdAt).fromNow()}</Text>
                    <Text className="text-base text-gray-300 mt-1">{reply.Content}</Text>
                </View> : <></>}
        </View>
    )
}