import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderTitle from '../components/HeaderTitle';
import { Video } from 'expo-av'

export default function VideoPreviewScreen({ route }) {
    const link = route.params.link;
    const video = useRef(null);
    useEffect(() => {
        video.current.playAsync();
    }, []);
    return (
        <SafeAreaView className="bg-[#0A0909] flex-1 ">
            <HeaderTitle name='AllTypeScreen' title='' isBack={true} />
            <View className=" flex-1 justify-center items-center">
                <Video
                    ref={video}
                    source={{ uri: link }}
                    className="w-screen h-60"
                    resizeMode={'contain'}
                    isLooping
                    useNativeControls
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})