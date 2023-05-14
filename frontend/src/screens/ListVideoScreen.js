import { View, Text, StatusBar, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import VideoLearning from '../components/VideoLearning';
import { Url } from '../contexts/constants';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function ListVideoScreen({ route }) {
    const course = route.params.course;
    const nav = useNavigation();
    const [videos, setVideos] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const getVideos = async () => {
        try {
            const res = await axios.get(`${Url}/course/getVideoOfCourse/` + course._id);
            // console.log(res.data.ListVideo);
            if (res.data.ListVideo.length > 0) {
                setVideos(res.data.ListVideo)
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getVideos();
    }, [])
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getVideos();
            setRefreshing(false);
        }, 1000);
    }, []);
    return (
        <View className="flex-1 bg-[#0A0909] p-5">
            <ScrollView className="mb-16"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <StatusBar backgroundColor={"#0A0909"} />
                {videos.map((v) => (
                    <VideoLearning key={v._id} item={v} />
                ))}
                {videos.length == 0 ?
                    <Text className="text-base text-gray-300 mt-2">Chưa có video bài học</Text> : <></>}
            </ScrollView>
            <View className="absolute  right-5 items-end bottom-5">
                <TouchableOpacity
                    className="justify-center items-center mt-2"
                    onPress={() => {
                        nav.navigate('AddVideoScreen', { idCourse: course._id })
                    }}>
                    <Text className="text-white bg-[#1273FE] font-semibold text-base p-3  rounded-xl">Thêm video</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}