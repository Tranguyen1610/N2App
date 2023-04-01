import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Type({item}) {
  return (
    <TouchableOpacity className="mr-3 mb-3 rounded-xl border border-white">
      <Text className="text-white p-2 text-base font-semibold">{item}</Text>
    </TouchableOpacity>
  )
}