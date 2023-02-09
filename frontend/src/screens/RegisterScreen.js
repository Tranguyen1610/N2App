import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

export default function RegisterScreen({ navigation }) {
    const [visible, setVisible] = useState(true)
    const [visiblePre, setVisiblePre] = useState(true)
    const [email, setEmail] = useState('');

    const ref_inputName = useRef();
    const ref_inputPasswordPre = useRef();
    const ref_inputEmail = useRef();
    const ref_inputPassword = useRef();
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView className="bg-[#0A0909] flex-1 px-4">
                <StatusBar style='light' />
                <Text className="text-white text-3xl font-medium mt-16">Đăng ký</Text>
                <View className="flex-row">
                    <Text className="text-[#7F889A] text-sm mr-2">Bạn đã có tài khoản?</Text>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('LoginScreen') }}>
                        <Text className="text-[#1273FE] text-sm">Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View className="flex-row  border-b border-[#3B3B3B] w-full h-9 mt-24">
                        <View className="w-1/12">
                            <Ionicons
                                name="person-outline"
                                size={24} color="#7F889A" />
                        </View>
                        <TextInput
                            ref={ref_inputName}
                            placeholder='Họ tên'
                            placeholderTextColor={'#7F889A'}
                            onSubmitEditing={() => ref_inputEmail.current.focus()}
                            className="text-white text-base w-11/12 pl-2" />
                    </View>
                    <View className="flex-row  border-b border-[#3B3B3B] w-full h-9 mt-5">
                        <View className="w-1/12">
                            <Ionicons
                                name="mail-outline"
                                size={24} color="#7F889A" />
                        </View>
                        <TextInput
                            ref={ref_inputEmail}
                            keyboardType='email-address'
                            placeholder='Email'
                            placeholderTextColor={'#7F889A'}
                            value={email}
                            onChangeText={(value) => setEmail(value)}
                            onSubmitEditing={() => ref_inputPassword.current.focus()}
                            className="text-white text-base w-11/12 pl-2" />
                    </View>
                    <View className="flex-row  border-b border-[#3B3B3B] w-full h-9 mt-5">
                        <View className="w-1/12">
                            <Ionicons
                                name="lock-closed-outline"
                                size={24} color="#7F889A" />
                        </View>
                        <TextInput
                            ref={ref_inputPassword}
                            placeholder='Mật khẩu'
                            secureTextEntry={visible}
                            placeholderTextColor={'#7F889A'}
                            onSubmitEditing={() => ref_inputPasswordPre.current.focus()}
                            className="text-white text-base w-10/12 px-2" />
                        <TouchableOpacity
                            className="w-1/12 items-end"
                            onPress={() => {
                                setVisible(!visible);
                            }}>
                            <Ionicons
                                name={visible === true ? 'eye-outline' : 'eye-off-outline'}
                                size={26}
                                color="#1273FE"
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row  border-b border-[#3B3B3B] w-full h-9 mt-5">
                        <View className="w-1/12">
                            <Ionicons
                                name="lock-closed-outline"
                                size={24} color="#7F889A" />
                        </View>
                        <TextInput
                            ref={ref_inputPasswordPre}
                            placeholder='Nhập lại mật khẩu'
                            secureTextEntry={visiblePre}
                            placeholderTextColor={'#7F889A'}
                            className="text-white text-base w-10/12 px-2" />
                        <TouchableOpacity
                            className="w-1/12 items-end"
                            onPress={() => {
                                setVisiblePre(!visiblePre);
                            }}>
                            <Ionicons
                                name={visiblePre === true ? 'eye-outline' : 'eye-off-outline'}
                                size={26}
                                color="#1273FE"
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity className="bg-[#1273FE] h-12 rounded-md mt-10 items-center justify-center"
                    onPress={() => navigation.navigate({ name: 'VerificationScreen', params: email })}>
                    <Text className="text-white text-center text-base font-medium">Đăng ký</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}