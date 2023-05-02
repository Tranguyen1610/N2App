import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerificationScreen from '../screens/VerificationScreen';
import StartScreen from '../screens/StartScreen';
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
            }}>
            
            <Stack.Screen 
                name="LoginScreen" 
                component={LoginScreen} 
                options={()=>({
                    headerShown: false,
                })}/>
            <Stack.Screen 
                name="RegisterScreen" 
                component={RegisterScreen} 
                options={()=>({
                    headerShown: false,
                })}/>
            <Stack.Screen 
                name="VerificationScreen" 
                component={VerificationScreen} 
                options={()=>({
                    headerShown: true,
                    headerStyle:{
                        backgroundColor:'#1273FE',
                    },
                    title:'Xác thực tài khoản',
                    headerTintColor:'#fff',
                    headerTitleStyle:{
                        fontSize:17,
                    }
                })}/>
        </Stack.Navigator>
    )
}