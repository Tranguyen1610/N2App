import { Image, Keyboard, KeyboardAvoidingView, StatusBar, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios'
import { apiUrl } from '../contexts/constants'

export default function LoginScreen({ navigation }) {
  const [visible, setVisible] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingg, setLoadingg] = useState(false)
  const [alert, setAlert] = useState('')

  const { login } = useContext(AuthContext)

  const ref_inputEmail = useRef()
  const ref_inputPassword = useRef()

  const login_onpress = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email === "" || password === "") {
      setAlert("Vui lòng điền đầy đủ thông tin")
      setTimeout(() => setAlert(''), 5000)
    } else
      if (reg.test(email) === false) {
        setAlert("Định dạng email không đúng")
        ref_inputEmail.current.focus()
        setTimeout(() => setAlert(''), 5000)
      }
      else
        try {
          const loginData = await login({ Email: email, Password: password })
          if (!loginData.success) {
            setAlert(loginData.message)
            setTimeout(() => setAlert(''), 5000)
          }
        } catch (error) {
          console.log(error)
        }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-[#0A0909] px-4">
        <StatusBar backgroundColor={"#0A0909"}/>
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
              className="text-white text-base w-11/12 pl-2"
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
            />
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
        <Text className="text-red-600 text-base text-center mt-3">{alert}</Text>
        <TouchableOpacity className="bg-[#1273FE] h-12 rounded-md mt-5 items-center justify-center"
          onPress={() => {
            login_onpress()
          }}>
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
