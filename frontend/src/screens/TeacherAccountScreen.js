import { View, Text, TouchableOpacity, Image, Alert, StyleSheet, Modal, TextInput, ActivityIndicator, StatusBar } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import HeaderTitle from '../components/HeaderTitle'
import StartScreen from './StartScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export default function TeacherAccountScreen({ navigation }) {
  const nav = useNavigation();
  const { userInfo, logout } = useContext(AuthContext)
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

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
            nav.navigate('AddCourseScreen')}>
          <Ionicons name="clipboard-outline" size={24} color="#129EF9" />
          <Text className="ml-2.5 mr-auto text-base text-white">Tất cả yêu cầu</Text>
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
      </View>
    </SafeAreaView>
  )
}
