import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image, Alert, Linking } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import { Url } from '../contexts/constants';
import axios from 'axios';

export default function AddCourseScreen() {
  const [image, setImage] = useState(' ');
  const [isLoading, setIsLoading] = useState(false);
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Cấp quyền truy cập",
        "Bạn cần cấp quyền cho phép ứng dụng này truy cập vào ảnh của bạn \n\nBấm mở cài đặt, chọn Quyền và bật ON các quyền tương thích",
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    }
    );

    // Explore the result 
    if (!result.cancelled) {
      setImage(result.uri);
      handleUpload()
    }
  }
  //send image
  // const handleImageChange = async (image) => {

  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function () {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function (e) {
  //       console.log(e);
  //       reject(new TypeError("Network request failed"));
  //     };
  //     xhr.responseType = "blob";
  //     xhr.open("GET", image.uri, true);
  //     xhr.send(null);
  //   });
  //   setIsLoading(true);
  //   const fileName = image.uri.slice(image.uri.lastIndexOf('/') + 1, image.uri.lastIndexOf('.')) + "-" + Date.now();
  //   const imageRef = ref(storage, `/image/${fileName}`);
  //   uploadBytes(imageRef, blob)
  //     .then(() => {
  //       getDownloadURL(imageRef)
  //         .then(async (url) => {
  //           setImage(url)
  //           setIsLoading(false);
  //         })
  //         .catch((error) => {
  //           console.log(error.message, "error getting the image url");
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });

  // };
  const handleUpload = async()=>{
    const formData = new FormData()
    formData.append('file',{
      name:'image.jpeg',
      uri: image,
      type: 'image/jpg'
    })
    setIsLoading(true);
    try {
      const response = await axios.post(`${Url}/upload`, formData,{
        headers:{
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setImage(' ');
    }
    setIsLoading(false);
  }

  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
    } else {
        Linking.openSettings();
    }
};
  return (
    <SafeAreaView className="flex-1 bg-[#0A0909] p-5">
      <ScrollView>
      <View
            className="w-max h-48 border border-gray-900 justify-center rounded-sm">
        {isLoading ?
            <ActivityIndicator size={'large'}  />:
          <Image
            className="w-max h-48 rounded-sm border-gray-900"
            source={{ uri: image }}
          />}
      </View>
        <TouchableOpacity
          className="justify-center items-center mt-5"
          onPress={() => showImagePicker()}>
          <Text className="text-white bg-[#1273FE] font-semibold text-base p-3  rounded-xl">Chọn ảnh bìa</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}