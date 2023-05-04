import { View, Text, Image, TextInput, Keyboard, Alert, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios'
import { Url } from '../contexts/constants';
import Toast from 'react-native-root-toast';

export default function VerificationScreen({route}) {
    const { userInfo,loadUser } = useContext(AuthContext);
    const pin1 = useRef();
    const pin2 = useRef();
    const pin3 = useRef();
    const pin4 = useRef();
    const [pin1v, setPin1v] = useState("");
    const [pin2v, setPin2v] = useState("");
    const [pin3v, setPin3v] = useState("");
    const [pin4v, setPin4v] = useState("");
    const [alert, setAlert] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);

    const otpCode = () => {
        return (pin1v + pin2v + pin3v + pin4v);
    }

    const sendOtp = async () => {
        try {
            await axios.post(`${Url}/otp/sendOTP`)
        }
        catch (error) {
            console.log(error);
        }
    }

    const verifyOTP = async () => {
        if (pin1v != "" && pin2v != "" && pin3v != "" && pin4v != "") {
            try {
                const otp = otpCode()
                const res = await axios.put(`${Url}/otp/verifyOTP`, { Otp: otp })
                console.log(res.data);
                if (res.data.success) {
                    setIsLoading(true);
                    setAlert("Xác thực tài khoản thành công");
                    setTimeout(() => {
                        loadUser();
                        setAlert("");
                        setIsLoading(false);
                    }, 1000)
                }
                else {
                    setAlert(res.data.message)
                    setTimeout(() => setAlert(''), 3000)
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            setAlert('Chưa nhập đủ mã')
            setTimeout(() => setAlert(''), 3000)
        }
    }

    useEffect(()=>{
        sendOtp();
    },[])

    return (
        <View className="bg-[#0A0909] flex-1 px-2 items-center">
            <StatusBar backgroundColor={"#0A0909"} />
            <Image
                source={require('../image/verification.png')}
                className="w-40 h-40 rounded-full mt-14" />
            <Text className="text-white text-base mt-5">
                Đã gửi mã OTP đến
            </Text>
            <Text className="text-[#1273FE] text-base mt-2">
                {route.params.email}
            </Text>
            <Text className="text-white text-base text-center mt-2">
                Xin kiểm tra email và điền mã xác nhận
            </Text>
            <View className="flex-row justify-around w-4/5 mt-8">
                <TextInput
                    className=" border-2 border-[#D9D9D9] text-center text-white text-2xl w-14 h-14 rounded-lg"
                    ref={pin1}
                    value={pin1v}
                    autoFocus={true}
                    selectTextOnFocus={true}
                    maxLength={1}
                    keyboardType={'number-pad'}
                    onChangeText={(e) => {
                        setPin1v(e.replace(/[^0-9]/g, ''))
                        if (e.replace(/[^0-9]/g, '') != "") pin2.current.focus();
                    }} />
                <TextInput
                    className=" border-2 border-[#D9D9D9] text-center text-white text-2xl w-14 h-14 rounded-lg"
                    ref={pin2}
                    value={pin2v}
                    selectTextOnFocus={true}
                    maxLength={1}
                    keyboardType={'number-pad'}
                    onChangeText={(e) => {
                        setPin2v(e.replace(/[^0-9]/g, ''))
                        if (e.replace(/[^0-9]/g, '') != "") pin3.current.focus();
                    }} />
                <TextInput
                    className=" border-2 border-[#D9D9D9] text-center text-white text-2xl w-14 h-14 rounded-lg"
                    ref={pin3}
                    value={pin3v}
                    selectTextOnFocus={true}
                    maxLength={1}
                    keyboardType={'number-pad'}
                    onChangeText={(e) => {
                        setPin3v(e.replace(/[^0-9]/g, ''))
                        if (e.replace(/[^0-9]/g, '') != "") pin4.current.focus();
                    }} />
                <TextInput
                    className=" border-2 border-[#D9D9D9] text-center text-white text-2xl w-14 h-14 rounded-lg"
                    ref={pin4}
                    value={pin4v}
                    selectTextOnFocus={true}
                    maxLength={1}
                    keyboardType={'number-pad'}
                    onChangeText={(e) => {
                        setPin4v(e.replace(/[^0-9]/g, ''))
                        if (e.replace(/[^0-9]/g, '') != "") Keyboard.dismiss();
                    }} />
            </View>
            <Text
                style={{
                    fontSize: 17,
                    marginTop: 30,
                    color: '#DC0E0E',
                }}>
                {alert}
            </Text>
            <TouchableOpacity className="bg-[#1273FE] h-12 rounded-md items-center justify-center w-4/5 mt-5"
                onPress={() => verifyOTP()}>
                {!isLoading ?
                    <Text className="text-white text-center text-base font-medium">Xác thực</Text> :
                    <View className="flex-row justify-center items-center">
                        <ActivityIndicator size={'large'} />
                    </View>
                }
            </TouchableOpacity>
            <Text className="text-base text-white mt-20">
                Bạn chưa nhận được mã hoặc mã đã hết hạn?
            </Text>
            <TouchableOpacity
                onPress={() => {
                    sendOtp();
                    setPin1v("");
                    setPin2v("");
                    setPin3v("");
                    setPin4v("");
                    Toast.show('Gửi mã hành công',
                        {
                            backgroundColor: '#3B404F',
                            textColor: '#ffffff',
                            opacity: 1,
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.CENTER,
                            animation: true,
                        })
                }}>
                <Text className="text-[#1273FE] text-base font-medium">
                    Gửi lại mã
                </Text>
            </TouchableOpacity>
        </View>
    )
}