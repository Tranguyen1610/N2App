import { View, Text, TextInput, ActivityIndicator, TouchableOpacity, Keyboard, StatusBar, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import axios from 'axios';
import { Url } from '../contexts/constants';
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';

export default function AddVideoScreen({ route }) {
  const data = route.params.idCourse;
  const nav = useNavigation()
  const [video, setVideo] = useState(null);
  const [linkVideo, setLinkVideo] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const videoRef = useRef();
  const [alertValue, setAlertValue] = useState("");
  const [key, setKey] = useState(Date.now());
  const [numVideo, setNumVideo] = useState(0);
  const [modalVisible,setModalVisible] = useState(false);
  const showVideoPicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Cấp quyền truy cập",
        "Bạn cần cấp quyền cho phép ứng dụng này truy cập vào thư viện của bạn \n\nBấm mở cài đặt, chọn Quyền và bật ON các quyền tương thích",
        [
          {
            text: 'Hủy',
          },
          {
            text: 'Mở cài đặt',
            onPress: () => handleOpenSettings(),
          },
        ], {
        cancelable: true,
      });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    // Explore the result 
    if (!result.cancelled) {
      // console.log(result);
      const { size } = await FileSystem.getInfoAsync(result.uri);
      const fileSizeInMB = size / (1024 * 1024)
      if(fileSizeInMB >100){
        setModalVisible(true);
      }
      else
        handleUploadVideo(result);
    }
  }

  const handleUploadVideo = async (e) => {
    const uri = e.uri;
    const fileType = uri.substring(uri.lastIndexOf('.') + 1);
    const formData = new FormData()
    formData.append('file', {
      uri: uri,
      name: `video.${fileType}`,
      type: `video/${fileType}`,
    });
    setIsLoadingVideo(true);
    try {
      const response = await axios.post(`${Url}/upload`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      });
      setLinkVideo(response.data.file)
      setVideo(uri);
      setIsLoadingVideo(false);
    } catch (error) {
      console.log(error);
      // setAlertValue(strign(error))
      setTimeout(() => setAlertValue(''), 3000)
      setVideo(null);
      setIsLoadingVideo(false);
    }

  }

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

  useEffect(() => {
    getNumVideoOfCourse()
  }, [])

  const check = async (yes) => {
    if (name !== "" && des !== "" && linkVideo !== "") {
      const dataVideo = {
        Name: name,
        Description: des,
        LinkVideo: linkVideo,
        CourseId: data
      }
      // console.log(dataVideo);
      try {
        const res = await axios.post(`${Url}/video/addVideo`, dataVideo);
        console.log(res.data);
        const dataAdd = {
          VideoId: res.data._id,
          CourseId: data
        }
        try {
          const response = await axios.put(`${Url}/course/addVideotoCourse`, dataAdd);
          console.log(response.data);
          Toast.show('Thành công',
            {
              backgroundColor: '#3B404F',
              textColor: '#ffffff',
              opacity: 1,
              duration: Toast.durations.SHORT,
              position: Toast.positions.CENTER,
              animation: true,
            })
          if (yes)
            reset();
          else
            nav.navigate('TeacherNavigator')
        } catch (error) {
          console.log(error);
        }
      } catch (err) {
        console.log(err);
      }
    }
    else {
      setAlertValue("Thông tin chưa đầy đủ")
      setTimeout(() => setAlertValue(''), 3000)
    }

  }

  const reset = () => {
    setNumVideo(numVideo + 1)
    setName(`Bài học ${numVideo + 2}`)
    setDes("")
    setLinkVideo("")
    setVideo(null)
    setKey(Date.now());
  }

  const getNumVideoOfCourse = async () => {
    try {
      const response = await axios.get(`${Url}/course/getVideoOfCourse/${data}`);
      setNumVideo(response.data.ListVideo.length);
      setName(`Bài học ${response.data.ListVideo.length + 1}`)
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <View className="flex-1 bg-[#0A0909] p-5">
      <StatusBar backgroundColor={"#0A0909"} />
      <TextInput
        placeholder='Tên'
        placeholderTextColor={'#7F889A'}
        className="text-white text-base  px-2 border border-gray-900 w-full h-12 mt-5 rounded-sm "
        value={name}
        onChangeText={(e) => setName(e)}
        editable={false}
      />
      <TextInput
        placeholder='Nội dung'
        placeholderTextColor={'#7F889A'}
        className="text-white text-base px-2 border border-gray-900 w-full h-12 my-5 rounded-sm "
        value={des}
        onChangeText={(e) => setDes(e)}
      />
      <View
        className="w-max h-48 border border-gray-900 justify-center rounded-sm mt-5">
        {isLoadingVideo ?
          <ActivityIndicator size={'large'} /> :
          <Video
            key={key}
            ref={videoRef}
            source={{ uri: video }}
            className="w-max h-48"
            resizeMode={'contain'}
            isLoopin={false}
            useNativeControls
          />}
      </View>
      <TouchableOpacity
        className="justify-center items-center mt-5"
        onPress={() => showVideoPicker()}>
        <Text className="text-white bg-gray-800 font-semibold text-base p-3  rounded-xl">Chọn video</Text>
      </TouchableOpacity>
      <Text className="text-red-600 text-base italic text-center mt-5" >{alertValue}</Text>
      {!isKeyboardOpen ?
        <View className="absolute bottom-10 right-5 items-end">
          <Text className="text-[#7F889A] italic">Nhấn "Hoàn thành" để hoàn tất thêm video</Text>
          <Text className="text-[#7F889A] italic text-right">Nhấn "Tiếp tục thêm mới" để thêm hoàn tất video và tiếp tục thêm video mới</Text>
          <View className="flex-row">
            <TouchableOpacity
              className="justify-center items-center mt-2"
              onPress={() => {
                check(false)
              }}>
              <Text className="text-white bg-[#1273FE] font-semibold text-base p-3  rounded-xl">Hoàn thành</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="justify-center items-center mt-2"
              onPress={() => {
                check(true)
              }}>
              <Text className="text-white bg-[#1273FE] font-semibold text-base p-3  rounded-xl ml-5">Tiếp tục thêm mới</Text>
            </TouchableOpacity>
          </View>
        </View> : <></>}
        <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
            animationType='fade'
            hardwareAccelerated>
            <View className="flex-1 justify-center items-center bg-[#00000099]" >
              <View className="bg-[#1B212D] w-[90%] rounded-lg">
                <Text className=" p-3 text-lg font-bold text-white">Thông báo</Text>
                  <View>
                    <View className="mt-2 ml-5 items-center">
                      <Text className="text-base text-white">Kích thước file vượt mức cho phép</Text>
                      <Text className="text-gray-500 mt-3">(Kích thước file phải nhỏ hơn 100 MB)</Text>
                    </View>
                    <View className="flex-row p-5 justify-end">
                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}>
                        <Text
                          className="text-base text-white"
                        >OK</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(false);
                          showVideoPicker();
                        }}>
                        <Text className="text-base text-[#1273FE] ml-5"
                        >Chọn lại</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              </View>
            </View>
          </Modal>
    </View>
  )
}