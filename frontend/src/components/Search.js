import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Search({ item }) {
    return (
        <TouchableOpacity className="items-start ">
            <Text className="text-white text-lg bg-gray-900 my-1 p-2 rounded-lg  ">#{item}</Text>
        </TouchableOpacity>
    )
}