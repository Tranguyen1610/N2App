import { Image, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

export default function LoginScreen({ navigation }) {
  const [visible, setVisible] = useState(true)
  const ref_inputEmail = useRef();
  const ref_inputPassword = useRef();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-[#0A0909] px-4">
        <StatusBar style='light' />
        <Text className="text-white text-3xl font-medium mt-16">Đăng nhập</Text>
        <View className="flex-row">
          <Text className="text-[#7F889A] text-sm mr-2">Bạn chưa có tài khoản?</Text>
          <TouchableOpacity
            onPress={() => { navigation.navigate('RegisterScreen') }}>
            <Text className="text-[#1273FE] text-sm">Đăng ký ngay</Text>
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
              ref={ref_inputEmail}
              keyboardType='email-address'
              placeholder='Email'
              placeholderTextColor={'#7F889A'}
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
        </View>
        <TouchableOpacity>
          <Text className="text-[#1273FE] text-right mt-2 text-sm">Quên mật khẩu?</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#1273FE] h-12 rounded-md mt-5 items-center justify-center">
          <Text className="text-white text-center text-base font-medium">Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-center items-center h-12 rounded-md bg-[#3B3B3B] mt-5">
          <Image
            source={require('../image/google.png')}
            className="w-8 h-8" />
          <Text className="text-white ml-3 text-base font-medium">
            Đăng nhập với Google
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}
