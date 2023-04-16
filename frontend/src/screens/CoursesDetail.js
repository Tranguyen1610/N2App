import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../components/HeaderTitle';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';

export default function CoursesDetail({ route }) {
    const course = route.params.course;
    console.log(course);
    const nav = useNavigation();
    const formatNumStart = (num) => {
        if (num)
            return num.toFixed(1);
        return ""
    }
    const formatPrice = (num) => {
        if(num)
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }
    return (
        <SafeAreaView className="bg-[#0A0909] flex-1">
            <HeaderTitle name='CoursesDetail' title='' isBack={true} />
            <ScrollView className="mx-5">
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
                <Text className="text-white font-semibold text-2xl">{course.name}</Text>
                <View className="flex-row items-center">
                    <Text className="text-white font-semibold mr-2 text-base"> {formatNumStart(4.1)}</Text>
                    <Rating
                        ratingCount={5}
                        imageSize={20}
                        tintColor='#0A0909'
                        readonly
                        startingValue={course.numStar}
                    />
                </View>
                <Text className="text-gray-400 text-sm">({course.numRating} xếp hạng) {course.numRating} học viên </Text>
                <View className="flex-row mt-2">
                    <Text className="text-gray-400 text-base"> Tác giả</Text>
                    <Text className="text-[#1273FE] text-base ml-3">{course.Teacher.Name}</Text>
                </View>
                <Text className="text-white font-bold text-2xl mt-5 mb-3">Những gì bạn sẽ học</Text>
                <View>
                    <Text className="text-base text-gray-400">~ Kiến thức nền tảng của ReactJS</Text>
                    <Text className="text-base text-gray-400">~ Làm giao diện nhanh và đơn giản với Material UI</Text>
                    <Text className="text-base text-gray-400">~ Thiết kế và triển khai API cho một dự án thực tế</Text>
                    <Text className="text-base text-gray-400">~ Xây dựng hoàn chỉnh một dự án thực tế</Text>
                </View>
                <TouchableOpacity>
                    <Text className="text-[#1273FE] text-base ml-3"> Xem thêm</Text>
                </TouchableOpacity>
            </ScrollView>
            <View className="absolute bottom-0 flex-row w-screen h-14 ">
                <TouchableOpacity className="bg-[#242F41] items-center justify-center w-3/12 flex-row border-r-2 border-gray-800">
                    <Ionicons name="heart-outline" size={35} color="#1273FE" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#242F41] items-center justify-center w-3/12">
                    <MaterialCommunityIcons name="cart-plus" size={35} color="#1273FE" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#1273FE] items-center justify-center w-6/12">
                    <Text className="text-white font-semibold text-xl">Mua ngay</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})