import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image, Alert, Linking, TextInput } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Url } from '../contexts/constants';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker'
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';


export default function AddCourseScreen() {
  const { types, setTypes } = useContext(AuthContext);
  const nav = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [alertValue, setAlertValue] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [des, setDes] = useState("");

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
    setTypes(list)
  }

  const check = () => {
    const regexPrice = /^[1-9][0-9]*$/;
    if (name !== "" && type !== "" && price !== "" && des !== "") {
      if (regexPrice.test(price)) {
        setAlertValue("")
        const datas ={
          Name:name,
          Type:type,
          Price:price,
          Description:des
        }
        nav.navigate('AddCourseStep2Screen',{data:datas})
      }
      else {
        setAlertValue("Giá phải là số lớn hơn 0")
        setTimeout(() => setAlertValue(''), 3000)
      }
    }
    else {
      setAlertValue("Phải điền đầy đủ thông tin")
      setTimeout(() => setAlertValue(''), 3000)
    }
  }

  useEffect(() => {
    getType()
  }, [])

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      }
    );

    // cleanup function to remove listeners when unmounting
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View className="flex-1 bg-[#0A0909] p-5">
      <TextInput
        placeholder='Tên khóa học'
        placeholderTextColor={'#7F889A'}
        className="text-white text-base  px-2 border border-gray-900 w-full h-12 my-5 rounded-sm "
        value={name}
        onChangeText={(e) => setName(e)} />
      <DropDownPicker
        items={types}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={type}
        setValue={(val) => setType(val)}
        maxHeight={200}
        scrollViewProps
        autoScroll
        placeholder='Chọn thể loại'
        dropDownDirection='BOTTOM'
        theme='DARK'
        textStyle={{
          color: "#fff"
        }}
      />
      <TextInput
        placeholder='Giá'
        placeholderTextColor={'#7F889A'}
        className="text-white text-base  px-2 border border-gray-900 w-full h-12 my-5 rounded-sm "
        value={price}
        onChangeText={(e) => setPrice(e)} />
      <TextInput
        multiline={true}
        numberOfLines={4}
        placeholder='Mô tả'
        placeholderTextColor={'#7F889A'}
        className="text-white text-base p-2 border border-gray-900 w-full mt-5 rounded-sm "
        style={{
          textAlignVertical: 'top',
          minHeight: 150
        }}
        value={des}
        onChangeText={(e) => setDes(e)} />
      <Text className="text-red-600 text-base italic text-center mt-10" >{alertValue}</Text>
      {!isKeyboardOpen ?
        <View className="absolute bottom-10 right-5 items-end">
          <Text className="text-[#7F889A] italic">Nhấn "Bước tiếp" để thêm ảnh bìa, video giới thiệu</Text>
          <TouchableOpacity
            className="justify-center items-center mt-2"
            onPress={() => check()}>
            <Text className="text-white bg-[#1273FE] font-semibold text-base p-3  rounded-xl">Bước tiếp</Text>
          </TouchableOpacity>
        </View> : <></>}
    </View>
  )
}