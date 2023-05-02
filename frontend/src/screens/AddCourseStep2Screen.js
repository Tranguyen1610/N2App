import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image, Alert, Linking, TextInput, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Url } from '../contexts/constants';

export default function AddCourseStep2Screen({ route }) {
    const data = route.params.data;
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [video, setVideo] = useState(null);
    const [linkVideo,setLinkVideo] = useState("");
    const [linkImage,setLinkImage] = useState("");
    const [isLoadingVideo, setIsLoadingVideo] = useState(false);
    const [alertValue, setAlertValue] = useState("")
    const videoRef = useRef();
    const nav = useNavigation();

    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert(
                "Cấp quyền truy cập",
                "Bạn cần cấp quyền cho phép ứng dụng này truy cập vào ảnh của bạn \n\nBấm mở cài đặt, chọn Quyền và bật ON các quyền tương thích",
                [
                    {
                        text: 'Hủy',
                    },
                    {
                        text: 'Mở cài đặt',
                        onPress: () => handleOpenSettings(),
                    },
                ], {
                cancelable: true,
            });
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        }
        );

        // Explore the result 
        if (!result.canceled) {
            handleUpload(result.assets[0])
            // console.log(result.assets[0]);
        }
    }
    const showVideoPicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert(
                "Cấp quyền truy cập",
                "Bạn cần cấp quyền cho phép ứng dụng này truy cập vào thư viện của bạn \n\nBấm mở cài đặt, chọn Quyền và bật ON các quyền tương thích",
                [
                    {
                        text: 'Hủy',
                    },
                    {
                        text: 'Mở cài đặt',
                        onPress: () => handleOpenSettings(),
                    },
                ], {
                cancelable: true,
            });
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        // Explore the result 
        if (!result.canceled) {
            // console.log(result);
            handleUploadVideo(result.assets[0])
        }
    }

    const handleUpload = async (e) => {
        const uri = e.uri;
        const fileType = uri.substring(uri.lastIndexOf('.') + 1);
        const formData = new FormData()
        formData.append('file', {
            uri: uri,
            name: `image.${fileType}`,
            type: `image/${fileType}`,
        });
        setIsLoading(true);
        try {
            const response = await axios.post(`${Url}/upload`, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });
            setLinkImage(response.data.file)
            setIsLoading(false);
            setImage(uri);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setImage(null);
        }

    }
    const handleUploadVideo = async (e) => {
        const uri = e.uri;
        const fileType = uri.substring(uri.lastIndexOf('.') + 1);
        const formData = new FormData()
        formData.append('file', {
            uri: uri,
            name: `video.${fileType}`,
            type: `video/${fileType}`,
        });
        setIsLoadingVideo(true);
        try {
            const response = await axios.post(`${Url}/upload`, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });
            setLinkVideo(response.data.file)
            setVideo(uri);
            setIsLoadingVideo(false);
        } catch (error) {
            console.log(error);
            setVideo(null);
            setIsLoadingVideo(false);
        }
       
    }

    const handleOpenSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
        } else {
            Linking.openSettings();
        }
    };
    useEffect(() => {
        console.log(data)
    }, [])
    const check=()=>{
        if(image===null || video===null){
            setAlertValue("Chọn đầy đủ ảnh bìa và video giới thiệu")
            setTimeout(() => setAlertValue(''), 3000)
        }
        else
        {
            setAlertValue("")
            data.Image = linkImage;
            data.Video = linkVideo;
            // console.log(data);
            createCourse();
            
        }
    }
    const createCourse = async()=>{
        try {
            // console.log(data);
            const res = await axios.post(`${Url}/course/createCourse`, data);
            console.log(res.data);
            nav.navigate('AddVideoScreen',{idCourse:res.data._id});
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View className="flex-1 bg-[#0A0909] p-5">
            <StatusBar backgroundColor={"#0A0909"}/>
            <View
                className="w-max h-48 border border-gray-900 justify-center rounded-sm">
                {isLoading ?
                    <ActivityIndicator size={'large'} /> :
                    <Image
                        className="w-max h-48 rounded-sm "
                        source={{ uri: image }}
                    />}
            </View>
            <TouchableOpacity
                className="justify-center items-center mt-5"
                onPress={() => showImagePicker()}>
                <Text className="text-white bg-gray-800 font-semibold text-base p-3  rounded-xl">Chọn ảnh bìa</Text>
            </TouchableOpacity>
            <View
                className="w-max h-48 border border-gray-900 justify-center rounded-sm mt-5">
                {isLoadingVideo ?
                    <ActivityIndicator size={'large'} /> :
                    <Video
                        ref={videoRef}
                        source={{ uri: video }}
                        className="w-max h-48"
                        resizeMode={'contain'}
                        isLoopin={false}
                        useNativeControls
                    />}
            </View>
            <TouchableOpacity
                className="justify-center items-center mt-5"
                onPress={() => showVideoPicker()}>
                <Text className="text-white bg-gray-800 font-semibold text-base p-3  rounded-xl">Chọn video giới thiệu</Text>
            </TouchableOpacity>
            <Text className="text-red-600 text-base italic text-center mt-5" >{alertValue}</Text>
            <View className="absolute bottom-10 right-5 items-end">
                <Text className="text-[#7F889A] italic">Nhấn "Hoàn thành" để tạo khóa học và thêm video</Text>
                <TouchableOpacity
                    className="justify-center items-center mt-2"
                    onPress={() => check()}>
                    <Text className="text-white bg-[#1273FE] font-semibold text-base p-3  rounded-xl">Hoàn thành</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}