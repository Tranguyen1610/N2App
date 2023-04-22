import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../components/HeaderTitle';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import Comment from '../components/Comment';
import axios from 'axios';
import { Url } from '../contexts/constants'
import VideoLearning from '../components/VideoLearning';
import { AuthContext } from '../contexts/AuthContext';
import Toast from 'react-native-root-toast';


export default function CoursesDetail({ route }) {
    const course = route.params.course;
    const { userInfo, wishlists, setWishLists, carts, setCarts } = useContext(AuthContext);
    const [comments, setComments] = useState([])
    const [videos, setVideos] = useState([])
    const [numStarAVG, setNumStarAVG] = useState(0);
    const [numCmt, setNumCmt] = useState(0);
    const [isCoursePurchased, setIsCoursePurchased] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isInWishList, setIsInWishList] = useState(false);
    const [isCourseOfCart, setIsCourseOfCart] = useState(false);

    const nav = useNavigation();
    const formatNumStart = (num) => {
        if (num != 0)
            return num.toFixed(1);
        else return "0";
    }
    const formatPrice = (num) => {
        if (num != null)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }

    const getComments = async () => {
        try {
            const res = await axios.get(`${Url}/comment/` + course._id);
            //   console.log(res.data);
            const listcmt = res.data;
            if (listcmt.length > 0) {
                setComments(listcmt)
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
    const checkIsCoursePurchased = () => {
        const list = userInfo.CoursePurchased;
        let result = false;
        for (let index = 0; index < list.length; index++) {
            const e = list[index];
            if (e._id === course._id) {
                result = true;
                break;
            }
        }
        setIsCoursePurchased(result)
        // console.log(result);
    }
    const checkIsCourseOfCart = () => {
        let result = false;
        for (let index = 0; index < carts.length; index++) {
            const e = carts[index];
            if (e._id === course._id) {
                result = true;
                break;
            }
        }
        setIsCourseOfCart(result)
        // console.log(result);
    }

    const getWishList = async () => {
        try {
            const result = await axios.get(`${Url}/user/getWishList`);
            if (result.data) {
                setWishLists(result.data)
                // console.log(result.data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const getCart = async () => {
        try {
          const result = await axios.get(`${Url}/user/getCart`);
          if (result.data) {
            setCarts(result.data)
            // console.log(result.data);
          }
        }
        catch (err) {
          console.log(err);
        }
      }

    const checkIsInWishList = () => {
        let result = false;
        for (let index = 0; index < wishlists.length; index++) {
            const e = wishlists[index];
            if (e._id === course._id) {
                result = true;
                break;
            }
        }
        setIsInWishList(result);
        // console.log(result);
    }

    const handleAddWishList = async () => {
        if (!isInWishList) {
            try {
                const res = await axios.put(`${Url}/user/addWishList/` + course._id);
                // console.log(res.data.ListVideo);
                if (res.data) {
                    const result = await axios.get(`${Url}/user/getWishList`);
                    if (result.data) {
                        setWishLists(result.data)
                    }
                    Toast.show('Thành công',
                        {
                            backgroundColor: '#3B404F',
                            textColor: '#ffffff',
                            opacity: 1,
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.CENTER,
                            animation: true,
                        })
                }
                // console.log(res.data);
            } catch (err) {
                console.log(err);
                Toast.show('Thất bại',
                    {
                        backgroundColor: '#3B404F',
                        textColor: '#ffffff',
                        opacity: 1,
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        animation: true,
                    })
            }
        }
        else {
            try {
                const res = await axios.put(`${Url}/user/deleteWishList/` + course._id);
                // console.log(res.data.ListVideo);
                if (res.data) {
                    const result = await axios.get(`${Url}/user/getWishList`);
                    if (result.data) {
                        setWishLists(result.data)
                    }
                    Toast.show('Thành công',
                        {
                            backgroundColor: '#3B404F',
                            textColor: '#ffffff',
                            opacity: 1,
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.CENTER,
                            animation: true,
                        })
                }
                // console.log(res.data);
            } catch (err) {
                console.log(err);
                Toast.show('Thất bại',
                    {
                        backgroundColor: '#3B404F',
                        textColor: '#ffffff',
                        opacity: 1,
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        animation: true,
                    })
            }
        }
    }

    const handleAddCart = async () => {
        if (!isCourseOfCart) {
            try {
                const res = await axios.put(`${Url}/user/addCart/` + course._id);
                // console.log(res.data.ListVideo);
                if (res.data) {
                    const result = await axios.get(`${Url}/user/getCart`);
                    if (result.data) {
                        setCarts(result.data)
                    }
                    Toast.show('Thành công',
                        {
                            backgroundColor: '#3B404F',
                            textColor: '#ffffff',
                            opacity: 1,
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.CENTER,
                            animation: true,
                        })
                }
                // console.log(res.data);
            } catch (err) {
                console.log(err);
                Toast.show('Thất bại',
                    {
                        backgroundColor: '#3B404F',
                        textColor: '#ffffff',
                        opacity: 1,
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                        animation: true,
                    })
            }
        }
        else {
            Toast.show('Khóa học đã nằm trong giỏ hàng',
                {
                    backgroundColor: '#3B404F',
                    textColor: '#ffffff',
                    opacity: 1,
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER,
                    animation: true,
                })
        }
    }

    useEffect(() => {
        if (wishlists.length == 0) getWishList();
        setTimeout(() => setIsLoading(false), 500)
        getComments();
        getVideos();
        checkIsCoursePurchased();

    }, [])
    useEffect(() => {
        checkIsInWishList();
    }, [wishlists])

    useEffect(() => {
        checkIsCourseOfCart();
    }, [carts])
    return (
        <SafeAreaView className="bg-[#0A0909] flex-1">
            <HeaderTitle name='CoursesDetail' title='' isBack={true} />
            {isLoading ?
                <View className="bg-[#0A0909] flex-1 justify-center items-center">
                    <ActivityIndicator size={'large'} color={'#1273FE'} />
                </View> :
                <View className="flex-1">
                    <ScrollView className="mx-5"
                        style={{ marginBottom: isCoursePurchased ? 20 : 70 }}>
                        <TouchableOpacity
                            onPress={() =>
                                nav.navigate("VideoPreviewScreen", { link: course.Video })
                            }>
                            <Image
                                source={{ uri: course.Image }}
                                className="w-fit h-56 mt-5 rounded-md" />
                            <View className="absolute top-24 w-screen items-center">
                                <Ionicons
                                    name="play"
                                    size={70}
                                    color="white"
                                />
                            </View>
                            <Text className="text-white absolute top-40 p-5 w-screen text-center font-bold text-xl">Xem trước khóa học</Text>
                        </TouchableOpacity>
                        <Text className="text-white font-semibold text-2xl">{course.Name}</Text>
                        <View className="flex-row items-center">
                            <Text className="text-white font-semibold mr-2 text-base"> {formatNumStart(numStarAVG)}</Text>
                            <Rating
                                ratingCount={5}
                                imageSize={20}
                                tintColor='#0A0909'
                                readonly
                                startingValue={numStarAVG}
                            />
                        </View>
                        <Text className="text-gray-400 text-sm">({numCmt} xếp hạng) {course.numRating} học viên </Text>
                        <View className="flex-row mt-2">
                            <Text className="text-gray-400 text-base"> Tác giả</Text>
                            <Text className="text-[#1273FE] text-base ml-3">{course.Teacher.Name}</Text>
                        </View>
                        <Text className="text-white font-bold text-3xl mt-3">{formatPrice(course.Price)}</Text>
                        <Text className="text-white font-bold text-2xl mt-5 mb-3">Những gì bạn sẽ học</Text>
                        <Text className="text-base text-gray-400">{course.Description}</Text>
                        {isCoursePurchased ?
                            <View>
                                <Text className="text-white font-bold text-2xl mt-5">Danh sách bài học</Text>
                                {videos.map((v) => (
                                    <VideoLearning key={v._id} item={v} />
                                ))}
                            </View> : <></>}
                        <Text className="text-white font-bold text-2xl mt-5">Phản hồi của học viên</Text>
                        {comments.length == 0 ?
                            <Text className="text-base text-gray-300 mt-2">Chưa có đánh giá</Text> : <></>}
                        {comments.map((g) => (
                            <Comment key={g._id} item={g} />
                        ))}

                    </ScrollView>
                    {!isCoursePurchased ?
                        <View className="absolute bottom-0 flex-row w-screen h-14 ">
                            <TouchableOpacity className="bg-[#242F41] items-center justify-center w-3/12 flex-row border-r-2 border-gray-800"
                                onPress={() => handleAddWishList()}>
                                <Ionicons name={isInWishList ? "heart" : "heart-outline"} size={35} color="#1273FE" />
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-[#242F41] items-center justify-center w-3/12"
                                onPress={() => handleAddCart()}>
                                <MaterialCommunityIcons name="cart-plus" size={35} color="#1273FE" />
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-[#1273FE] items-center justify-center w-6/12">
                                <Text className="text-white font-semibold text-xl">Mua ngay</Text>
                            </TouchableOpacity>
                        </View>
                        : <></>}
                </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})