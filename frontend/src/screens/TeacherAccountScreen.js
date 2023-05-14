import { View, Text, TouchableOpacity, Image, Alert, StyleSheet, Modal, TextInput, ActivityIndicator, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import HeaderTitle from '../components/HeaderTitle'
import StartScreen from './StartScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Url } from '../contexts/constants'
import axios from 'axios'
import Toast from 'react-native-root-toast'

export default function TeacherAccountScreen({ navigation }) {
  const nav = useNavigation();
  const { userInfo, logout } = useContext(AuthContext)
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertt, setAlertt] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankNumber, setBankNumber] = useState('');

  const switchType = async () => {
    await AsyncStorage.setItem('mode', "Student")
    navigation.navigate("SwitchStudent")
  }
  const clicklogout = () => {
    setIsLogout(true)
    setTimeout(() => {
      setIsLogout(false)
    }, 1000)
    logout();
  }
  const getBankAccount = async () => {
    try {
      const res = await axios.get(`${Url}/user/bankAccount/${userInfo._id}`);
      if (res.data) {
        setBankName(res.data.BankAccount.BankName);
        setBankNumber(res.data.BankAccount.BankNumber);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const updateBankAccount = async () => {
    if (bankName && bankNumber) {
      try {
        const res = await axios.put(`${Url}/user/updateBankAccount`,
          { BankName: bankName, BankNumber: bankNumber });
        if (res.data) {
          setModalVisible(false);
          setAlertt('');
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
    else {
      setAlertt("Thông tin chưa đầy đủ");
      setTimeout(() => setAlertt(""), 5000)
    }
  }

  useEffect(() => {
    getBankAccount();
  }, [])

  return (
    <SafeAreaView className="bg-[#0A0909] flex-1 ">
      <StatusBar backgroundColor={"#0A0909"} />
      <HeaderTitle name={TeacherAccountScreen} title={'Tài khoản'} isBack={false} />
      <View className="px-5">
        <View className="items-center">
          <Image source={require('../image/user_logo.png')} className="w-24 h-24 mt-5" />
          <Text className="text-2xl font-bold mt-2 text-white">{userInfo.Name}</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="mail-outline" size={26} color="white" />
            <Text className="ml-2 text-lg text-gray-300">{userInfo.Email}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            switchType()
          }}>
          <Text className="text-[#1273FE] text-center font-bold text-base mt-5">Chuyển sang chế độ học viên</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-600 mt-5"
          onPress={() =>
            nav.navigate('AddCourseScreen')}>
          <Ionicons name="md-add-circle-outline" size={24} color="#17D8B7" />
          <Text className="ml-2.5 mr-auto text-base text-white">Thêm khóa học</Text>
          <Ionicons
            name='chevron-forward'
            size={25}
            color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-600"
          onPress={() =>
            nav.navigate('RequestScreen')}>
          <Ionicons name="clipboard-outline" size={24} color="#129EF9" />
          <Text className="ml-2.5 mr-auto text-base text-white">Tất cả yêu cầu</Text>
          <Ionicons
            name='chevron-forward'
            size={25}
            color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-600"
          onPress={() =>
            setModalVisible(true)}>
          <MaterialCommunityIcons name="bank" size={24} color="#F4AE17" />
          <Text className="ml-2.5 mr-auto text-base text-white">Tài khoản ngân hàng</Text>
          <Ionicons
            name='chevron-forward'
            size={25}
            color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-600"
          onPress={() => {
            setModalLogoutVisible(true)
          }}>
          <Ionicons
            name='md-log-out-outline'
            size={25}
            color='red' />
          <Text className="ml-2.5 mr-auto text-base text-white">Đăng xuất</Text>
        </TouchableOpacity>
        <Modal
          visible={modalLogoutVisible}
          transparent={true}
          onRequestClose={() => setModalLogoutVisible(false)}
          animationType='fade'
          hardwareAccelerated>
          <View className="flex-1 justify-center items-center bg-[#00000099]" >
            <View className="bg-[#1B212D] w-[90%] rounded-lg">
              <Text className=" p-3 text-lg font-bold text-white">Đăng xuất</Text>
              {isLogout === false ?
                <View>
                  <View className="mt-2 ml-5 items-start">
                    <Text className="text-base text-white">Bạn có chắc chắn đăng xuất?</Text>
                  </View>
                  <View className="flex-row p-5 justify-end">
                    <TouchableOpacity
                      onPress={() => setModalLogoutVisible(false)}>
                      <Text
                        className="text-base text-white"
                      >Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        clicklogout()
                      }}>
                      <Text className="text-base text-[#1273FE] ml-5"
                      >Đăng xuất</Text>
                    </TouchableOpacity>
                  </View>
                </View> :
                <View className="flex-row justify-center mb-10">
                  <Text className=" p-3 text-xl font-bold text-[#1273FE]">Đang đăng xuất</Text>
                  <ActivityIndicator size={'large'} color={'#1273FE'} className="" />
                </View>}
            </View>
          </View>
        </Modal>
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
          animationType='fade'
          hardwareAccelerated>
          <View className="flex-1 justify-center items-center bg-[#00000099]" >
            <View className="bg-[#1B212D] w-[90%] rounded-md">
              <Text className="border-b border-[#fff] p-3 text-lg font-bold text-white">Cập nhật tài khoản ngân hàng</Text>
              <View className="mt-5 justify-center items-center">
                <View
                  className="flex-row justify-between w-[90%] border-[#C1C1C1] border rounded-md p-2">
                  <TextInput
                    className="text-white text-base w-full"
                    placeholderTextColor={"gray"}
                    placeholder='Nhập tên ngân hàng'
                    value={bankName}
                    onChangeText={(value) => { setBankName(value); setAlertt('') }}
                    onPressIn={() =>
                      setAlertt('')}
                  />
                </View>
                <View
                  className="flex-row justify-between w-[90%] border-[#C1C1C1] border rounded-md p-2 mt-3">
                  <TextInput
                    className="text-white text-base w-full"
                    placeholderTextColor={"gray"}
                    placeholder='Nhập số tài khoản'
                    value={bankNumber}
                    onChangeText={(value) => { setBankNumber(value); setAlertt('') }}
                    onPressIn={() =>
                      setAlertt('')}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 17,
                    marginTop: 10,
                    color: '#E33333',
                  }}>{alertt}</Text>

              </View>
              <View className="flex-row p-5 justify-end">
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}>
                  <Text
                    className="text-base text-white"
                  >Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    updateBankAccount();
                  }}>
                  <Text className="text-base text-[#1273FE] ml-5"
                  >Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}
