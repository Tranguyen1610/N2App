import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import React, { useContext, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../contexts/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function RegisterScreen({ navigation }) {
    const [visible, setVisible] = useState(true)
    const [visiblePre, setVisiblePre] = useState(true)

    const { register,setUserToken,loadUser_Register } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [prePassword, setPrePassword] = useState('')
    const [birthday, setBirthday] = useState('')

    const [alert, setAlert] = useState('')
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

    const [textdate, setTextDate] = useState("Chọn ngày sinh")
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

    const ref_inputName = useRef();
    const ref_inputPasswordPre = useRef();
    const ref_inputEmail = useRef();
    const ref_inputPassword = useRef();

    const handleConfirm = (date) => {
        let tempDate = new Date(date);
        let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() * 1 + 1) + "/" + tempDate.getFullYear();
        setTextDate(fDate);
        setBirthday(tempDate);
        setDatePickerVisibility(false);
    };
    const register_onpress = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (name === "" || email === "" || password === "" || prePassword == "" || birthday === "") {
            setAlert("Vui lòng điền đầy đủ thông tin")
            setTimeout(() => setAlert(''), 5000)
        }
        else
            if (reg.test(email) === false) {
                setAlert("Định dạng email không đúng")
                ref_inputEmail.current.focus()
                setTimeout(() => setAlert(''), 5000)
            }
            else {
                if (prePassword === password) {
                    try {
                        const registerData = await register({ Name: name, Email: email, Password: password, DateOfBirth: birthday })
                        console.log(registerData);
                        if (registerData.success) {
                            setAlert("Tạo tài khoản thành công")
                            setIsRegisterSuccess(true)
                            setTimeout(() => {
                                setUserToken(registerData.token);
                                AsyncStorage.setItem('userToken',registerData.token);
                                loadUser_Register() ;
                                setIsRegisterSuccess(false)
                            }, 2000)
                        } else {
                            setAlert(registerData.message)
                            setIsRegisterSuccess(false)
                            setTimeout(() => setAlert(null), 5000)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                else {
                    setAlert("Mật khẩu không khớp")
                    setTimeout(() => setAlert(''), 5000)
                }
            }

    }

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
                    <Text className="text-red-600 text-base text-center mt-24">{alert}</Text>
                    <View className="flex-row  border-b border-[#3B3B3B] w-full h-9 mt-5">
                        <View className="w-1/12">
                            <Ionicons
                                name="person-outline"
                                size={24} color="#7F889A" />
                        </View>
                        <TextInput
                            ref={ref_inputName}
                            placeholder='Họ tên'
                            placeholderTextColor={'#7F889A'}
                            value={name}
                            onChangeText={(value) => setName(value)}
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
                            onBlur={() => {
                                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                                if (reg.test(email) === false) {
                                    setAlert("Định dạng email không đúng")
                                    ref_inputEmail.current.focus()
                                    setTimeout(() => setAlert(''), 5000)
                                }
                            }}
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
                            value={password}
                            onChangeText={(value) => setPassword(value)}
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
                            value={prePassword}
                            onChangeText={(value) => setPrePassword(value)}
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
                <TouchableOpacity
                    className="flex-row  border-b border-[#3B3B3B] w-full h-9 mt-5 "
                    onPress={() => setDatePickerVisibility(true)}>
                    <Ionicons name='calendar-outline' size={25} color={'#7F889A'} className="w-1/12" />
                    <Text className="text-white text-base w-11/12 pl-2">{textdate}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={() => setDatePickerVisibility(false)}
                />
                <TouchableOpacity className="bg-[#1273FE] h-12 rounded-md mt-10 items-center justify-center"
                    // onPress={() => navigation.navigate({ name: 'VerificationScreen', params: email })}
                    onPress={() => {
                        register_onpress();
                    }}>
                    {!isRegisterSuccess ?
                        <Text className="text-white text-center text-base font-medium">Đăng ký</Text> :
                        <View className="flex-row justify-center items-center">
                            <ActivityIndicator size={'large'} />
                            <Text className="text-white text-center text-base font-medium pl-2">Đăng nhập</Text>
                        </View>
                    }
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}