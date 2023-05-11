import { View, Text, FlatList, Image, TouchableOpacity, StatusBar, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CoursesPayment from '../components/CoursesPayment';
import moment from 'moment';
import 'moment/locale/vi';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Url } from '../contexts/constants'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';


export default function RequestDetailScreen({ route }) {
    const formatPrice = (num) => {
        if (num != null)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        return ""
    }
    const nav = useNavigation();
    const request = route.params.request;
    const { setListRequestNoAccept, setListRequestCancel} = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);

    const handleCancelRequest = async () => {
        try {
            const res = await axios.put(`${Url}/request/cancelRequest/` + request._id);
            if (res.data) {
                getRequestNoAccept();
                getRequestcancel();
                nav.goBack();
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
        } catch (err) {
            console.log(err);
        }
    }

    const getRequestNoAccept = async () => {
        try {
            const result = await axios.get(`${Url}/request/getRequestByTeacherNoAccept`);
            if (result.data) {
                setListRequestNoAccept(result.data)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const getRequestcancel = async () => {
        try {
            const result = await axios.get(`${Url}/request/getRequestByTeacherCancel`);
            if (result.data) {
                setListRequestCancel(result.data)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // console.log(order);
    }, [])
    return (
        <View className="flex-1 bg-[#0A0909] p-5">
            <StatusBar backgroundColor={"#0A0909"} />
            <View className='bg-[#1273FE] p-5 rounded-md mb-5'>
                {request.Status ?
                    <Text className="text-white text-base font-medium">
                        Yêu cầu đã được xử lý
                    </Text> : request.IsCancel ?
                        <Text className="text-white text-base font-medium">
                            Yêu cầu đã được hủy bỡi bạn
                        </Text> :
                        <Text className="text-white text-base font-medium">
                            Yêu cầu chưa được xử lý
                        </Text>}
            </View>
            <View>
                <View className="mt-5">
                    <Text className="text-white text-base">Loại yêu cầu:    {request.Content.Name}</Text>
                </View>
                {request.Content.Key === "buycourse" ?
                    <View className="mt-2">
                        <Text className="text-white text-base">Tên khóa học:    {request.Course.Name}</Text>
                    </View> : request.Content.Key === "withdrawmoney" ?
                        <View className="mt-2">
                            <Text className="text-white text-base">Số tiền:    {formatPrice(request.Amount)}</Text>
                        </View> : <></>}
                {request.Status ?
                    <View className="flex-row mt-2">
                        <Text className="text-white text-right text-base">Trạng thái: </Text>
                        <Text className="text-[#1273FE] text-right text-base font-medium">
                            {request.Result == 0 ? "Chấp nhận" : "Từ chối"}
                        </Text>
                    </View> :
                    <View>

                    </View>}
            </View>

            <View className='absolute bottom-5 left-5 justify-end h-64 w-full'>
                <View className='flex-row justify-between'>
                    <Text className='text-white text-base font-medium'>Mã yêu cầu</Text>
                    <Text className='text-[#1273FE] text-base font-medium'>#{request._id.toUpperCase()}</Text>
                </View>
                <View className='flex-row justify-between mt-1'>
                    <Text className='text-white text-base'>Thời gian gửi yêu cầu</Text>
                    <Text className='text-gray-400 text-base'>{moment(request.createdAt).format('lll')}</Text>
                </View>
                {request.Status ?
                    <View className='flex-row justify-between mt-1'>
                        <Text className='text-white text-base'>Thời gian xử lý</Text>
                        <Text className='text-gray-400 text-base'>{moment(request.updatedAt).format('lll')}</Text>
                    </View> : <></>}
                {request.IsCancel ?
                    <View className='flex-row justify-between mt-1'>
                        <Text className='text-white text-base'>Thời gian hủy</Text>
                        <Text className='text-gray-400 text-base'>{moment(request.updatedAt).format('lll')}</Text>
                    </View> : <></>}

                {!request.Status && !request.IsCancel ?
                    <View className='flex-row justify-end'>
                        <TouchableOpacity className="bg-red-600 requests-center  mt-3 p-2 rounded-md"
                            onPress={() => setModalVisible(true)}>
                            <Text className="text-white font-semibold text-lg">Hủy</Text>
                        </TouchableOpacity>

                    </View> : <></>}
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
                animationType='fade'
                hardwareAccelerated>
                <View className="flex-1 justify-center items-center bg-[#00000099]" >
                    <View className="bg-[#1B212D] w-[90%] rounded-lg">
                        <Text className=" p-3 text-lg font-bold text-white">Thông báo</Text>
                        <View>
                            <View className="mt-2 ml-5 items-start">
                                <Text className="text-base text-white">Bạn có chắc chắn hủy đơn hàng?</Text>
                            </View>
                            <View className="flex-row p-5 justify-end">
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}>
                                    <Text
                                        className="text-base text-white"
                                    >Đóng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleCancelRequest();
                                    }}>
                                    <Text className="text-base text-[#1273FE] ml-5"
                                    >Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}