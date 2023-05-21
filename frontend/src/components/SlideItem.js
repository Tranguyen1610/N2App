import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('screen');
export default function SlideItem({ item }) {
  return (
    <View style={styles.container}>
      <Image
        source={item.img}
        resizeMode="contain"
        className="w-60"
      />
      <Text className="text-white text-lg font-medium">{item.title}</Text>
      <Text className="text-white text-base text-center px-10 mt-3">{item.description}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
  },
});