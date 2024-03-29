import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function HomeScreen() {
    const { logout} = useContext(AuthContext)
  return (
    <View>
      <StatusBar backgroundColor={"#0A0909"}/>
      <Text>HomeScreen</Text>
      <TouchableOpacity
        onPress={()=>logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})