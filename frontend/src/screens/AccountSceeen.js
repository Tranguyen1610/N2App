import { View, Text, TouchableOpacity, Image, Alert, StyleSheet, Modal, TextInput } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import HeaderTitle from '../components/HeaderTitle'

export default function AccountSceeen({navigation}) {
  const { userInfo, logout } = useContext(AuthContext)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const ref_inputPassword = useRef();
  const ref_inputNewPassword = useRef();
  const ref_inputCfNewPassword = useRef();
  const [visible, setVisible] = useState(true)
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [cfNewPassword, setCfNewPassword] = useState('');
  const [alertt, setAlertt] = useState('');
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1 ">
      <HeaderTitle name={AccountSceeen} title={'Tài khoản'} isBack={false} nav={navigation} />
      <View className="px-5">
        <View className="items-center">
          <Image source={require('../image/user_logo.png')} className="w-24 h-24 mt-5" />
          <Text className="text-2xl font-bold mt-2 text-white">{userInfo.Name}</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="mail-outline" size={26} color="white" />
            <Text className="ml-2 text-lg text-gray-300">{userInfo.Email}</Text>
          </View>
        </View>
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-600 mt-10">
          <MaterialIcons
            name="drive-file-rename-outline"
            size={24}
            color="#129EF9" />
          <Text className="ml-2.5 mr-auto text-base text-white">Đổi tên</Text>
          <Ionicons
            name='chevron-forward'
            size={25}
            color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-600"
          onPress={() => {
            setModalVisible(true)
            setPassword("")
            setNewPassword("")
            setCfNewPassword("")
            setVisible(true)
            setAlertt("")
          }}>
          <Ionicons
            name='key-outline'
            size={25}
            color='#17D8B7' />
          <Text className="ml-2.5 mr-auto text-base text-white">Đổi mật khẩu</Text>
          <Ionicons
            name='chevron-forward'
            size={25}
            color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-600">
          <Ionicons
            name='language'
            size={25}
            color='#E572F6' />
          <Text className="ml-2.5 mr-auto text-base text-white">Ngôn ngữ</Text>
          <Ionicons
            name='chevron-forward'
            size={25}
            color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-600"
          // onPress={() =>
          //   Alert.alert("Thông báo", "Bạn có chắc chắn đăng xuất", [
          //     {
          //       text: 'Hủy',
          //       style: 'cancel',
          //     },
          //     {
          //       text: 'Đăng xuất',
          //       onPress: () => {
          //         logout()
          //       }

          //     }
          //   ])
          // }>
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
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
          animationType='fade'
          hardwareAccelerated>
          <View className="flex-1 justify-center items-center bg-[#00000099]" >
            <View className="bg-[#221C1C] w-[90%] rounded-md">
              <Text className="border-b border-[#fff] p-3 text-lg font-bold text-white">Đổi mật khẩu</Text>
              <View className="mt-5 justify-center items-center">
                <View className="flex-row justify-between w-[90%] border-[#C1C1C1] border rounded-md p-2"
                >
                  <TextInput
                    ref={ref_inputPassword}
                    className="text-white text-base"
                    placeholderTextColor={"gray"}
                    placeholder='Mật khẩu'
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry={visible}
                    onEndEditing={() => ref_inputNewPassword.current.focus()}
                    onPressIn={() =>
                      setAlertt('')}
                  />
                </View>
                <View
                  className="flex-row justify-between w-[90%] border-[#C1C1C1] border rounded-md p-2 mt-3">
                  <TextInput
                    ref={ref_inputNewPassword}
                    className="text-white text-base"
                    placeholderTextColor={"gray"}
                    placeholder='Mật khẩu mới'
                    value={newPassword}
                    onChangeText={(value) => setNewPassword(value)}
                    secureTextEntry={visible}
                    onSubmitEditing={() => ref_inputNewPassword.current.focus()}
                    onPressIn={() =>
                      setAlertt('')}
                  />
                </View>
                <View
                  className="flex-row justify-between w-[90%] border-[#C1C1C1] border rounded-md p-2 mt-3">
                  <TextInput
                    ref={ref_inputCfNewPassword}
                    className="text-white text-base"
                    placeholderTextColor={"gray"}
                    placeholder='Nhập lại mật khẩu mới'
                    value={cfNewPassword}
                    onChangeText={(value) => setCfNewPassword(value)}
                    secureTextEntry={visible}
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
                  className="mr-5"
                  onPress={() => {
                    setVisible(!visible);
                  }}>
                  <Ionicons
                    name={visible === false ? 'eye-outline' : 'eye-off-outline'}
                    size={26} color={"#1273FE"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}>
                  <Text
                    className="text-base text-white"
                  >Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleUpdatePassword()
                  }}>
                  <Text className="text-base text-[#1273FE] ml-5"
                  >Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={modalLogoutVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
          animationType='fade'
          hardwareAccelerated>
          <View className="flex-1 justify-center items-center bg-[#00000099]" >
            <View className="bg-[#221C1C] w-[90%] rounded-lg">
              <Text className=" p-3 text-lg font-bold text-white">Đăng xuất</Text>
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
                    logout()
                  }}>
                  <Text className="text-base text-[#1273FE] ml-5"
                  >Đăng xuất</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}
