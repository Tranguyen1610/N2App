import { View, Text, Image, TextInput, Keyboard, Alert, TouchableOpacity, StatusBar } from 'react-native'
import React, { useRef, useState } from 'react'

export default function VerificationScreen({ route }) {
    const pin1 = useRef();
    const pin2 = useRef();
    const pin3 = useRef();
    const pin4 = useRef();
    const [pin1v, setPin1v] = useState("");
    const [pin2v, setPin2v] = useState("");
    const [pin3v, setPin3v] = useState("");
    const [pin4v, setPin4v] = useState("");
    return (
        <View className="bg-[#0A0909] flex-1 px-2 items-center">
            <StatusBar backgroundColor={"#0A0909"}/>
            <Image
                source={require('../image/verification.png')}
                className="w-40 h-40 rounded-full mt-14" />
            <Text className="text-white text-base mt-5">
                Đã gửi mã OTP đến
            </Text>
            <Text className="text-white text-base">
                {route.params}
            </Text>
            <Text className="text-white text-base text-center">
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
            <TouchableOpacity className="bg-[#1273FE] h-12 rounded-md items-center justify-center w-4/5 mt-10">
                <Text className="text-base text-white font-medium">
                    Xác thực
                </Text>
            </TouchableOpacity>
            <Text className="text-base text-white mt-20">
                Bạn chưa nhận được mã hoặc mã đã hết hạn?
            </Text>
            <TouchableOpacity>
                <Text className="text-[#1273FE] text-base font-medium">
                    Gửi lại mã
                </Text>
            </TouchableOpacity>
        </View>
    )
}