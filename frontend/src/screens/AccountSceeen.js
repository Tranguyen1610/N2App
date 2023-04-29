import { View, Text, TouchableOpacity, Image, Alert, StyleSheet, Modal, TextInput, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import HeaderTitle from '../components/HeaderTitle'
import StartScreen from './StartScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'
import { Url } from '../contexts/constants';
import axios from 'axios';
import Toast from 'react-native-root-toast'

export default function AccountSceeen({ navigation }) {
  const { userInfo, logout, types, setTypes, listFavoriteType, setListFavoriteType } = useContext(AuthContext)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFavoriteType, setModalFavoriteType] = useState(false);
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const ref_inputPassword = useRef();
  const ref_inputNewPassword = useRef();
  const ref_inputCfNewPassword = useRef();
  const [visible, setVisible] = useState(true)
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [cfNewPassword, setCfNewPassword] = useState('');
  const [alertt, setAlertt] = useState('');
  const [isLogout, setIsLogout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState([]);

  const switchType = async () => {
    await AsyncStorage.setItem('mode', "Teacher")
    navigation.navigate("SwitchTeacher")
  }
  const clicklogout = () => {
    setIsLogout(true)
    setTimeout(() => {
      setIsLogout(false)
    }, 1000)
    logout();
  }
  const getType = async () => {
    let list = [];
    try {
      const res = await axios.get(`${Url}/type`);
      // console.log(res.data);
      const listtype = res.data;
      for (let index = 0; index < listtype.length; index++) {
        list.push({ label: listtype[index].Name, value: listtype[index]._id })
      }
    } catch (err) {
      console.log(err);
    }
    setTypes(list);
  }

  const getFavoriteType = async () => {
    let list = [];
    try {
      const res = await axios.get(`${Url}/user/getFavoriteType`);
      // console.log(res.data);
      const listtype = res.data;
      setListFavoriteType(res.data);
      for (let index = 0; index < listtype.length; index++) {
        list.push(listtype[index]._id)
      }
    } catch (err) {
      console.log(err);
    }
    setValue(list);
  }

  const updateFavoriteType = async () => {
    try {
      const res = await axios.put(`${Url}/user/updateFavoriteType`, {types:value});
      if (res.data) {
        getFavoriteType();
        setModalFavoriteType(false);
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

  useEffect(() => {
    getFavoriteType();
    getType();
  }, [])
  return (
    <SafeAreaView className="bg-[#0A0909] flex-1 ">
      <HeaderTitle name={AccountSceeen} title={'Tài khoản'} isBack={false} />
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
          <Text className="text-[#1273FE] text-center font-bold text-base mt-5">Chuyển sang chế độ giảng viên</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-600 mt-5">
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
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-600"
          onPress={() => {
            setIsOpen(true);
            setModalFavoriteType(true);
          }}>
          <Ionicons
            name='apps-outline'
            size={25}
            color='#FCC61F' />
          <Text className="ml-2.5 mr-auto text-base text-white">Thể loại yêu thích</Text>
          <Ionicons
            name='chevron-forward'
            size={25}
            color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-600"
          onPress={() => navigation.navigate('OrderScreen')}>
          <Ionicons
            name="clipboard-outline"
            size={25}
            color="#0F9ACE" />
          <Text className="ml-2.5 mr-auto text-base text-white">Đơn hàng</Text>
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
            <View className="bg-[#1B212D] w-[90%] rounded-md">
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
          visible={modalFavoriteType}
          transparent={true}
          onRequestClose={() => setModalFavoriteType(false)}
          animationType='slide'
          hardwareAccelerated>
          <View className="flex-1 justify-end mb-[60px] bg-[#00000099]" >
            <View className="bg-[#1B212D] w-[100%] rounded-tl-lg rounded-tr-lg px-5 py-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-bold text-white">Thể loại yêu thích</Text>
                <TouchableOpacity
                  onPress={() => setModalFavoriteType(false)}>
                  <Ionicons name="close-circle" size={25} color="#1273FE" />
                </TouchableOpacity>
              </View>
              <View className="justify-start items-center my-5">
                <DropDownPicker
                  className='mb-[200px]'
                  items={types}
                  open={isOpen}
                  setOpen={setIsOpen}
                  value={value}
                  setValue={setValue}
                  maxHeight={200}
                  scrollViewProps
                  autoScroll
                  placeholder='Chọn thể loại'
                  dropDownDirection='BOTTOM'
                  theme='DARK'
                  textStyle={{
                    color: "#fff"
                  }}
                  mode="BADGE"
                  badgeColors={"#1273FE"}
                  showBadgeDot={true}
                  badgeDotColors={"#EC2612"}
                  multiple={true}
                  
                />
                <TouchableOpacity className="ml-auto mt-3"
                  onPress={() => updateFavoriteType()}>
                  <Text className="text-base text-white text-center bg-[#1273FE] p-2 rounded-md font-medium ml-5">
                    Cập nhật
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}
