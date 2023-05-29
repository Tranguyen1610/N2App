import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerificationScreen from '../screens/VerificationScreen';
import StartScreen from '../screens/StartScreen';
import NoLoginScreen from '../screens/NoLoginScreen';
import { AuthContext } from '../contexts/AuthContext';
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    const { isLogin } = useContext(AuthContext);
    return (
        <Stack.Navigator
            initialRouteName={isLogin? 'LoginScreen':'NoLoginScreen'}
            screenOptions={{
            }}>

            <Stack.Screen
                name="NoLoginScreen"
                component={NoLoginScreen}
                options={() => ({
                    headerShown: false,
                    animation: 'none'
                })} />

            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={() => ({
                    headerShown: false,
                    animation: 'none'
                })} />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={() => ({
                    headerShown: false,
                    animation: 'none'
                })} />
            <Stack.Screen
                name="VerificationScreen"
                component={VerificationScreen}
                options={() => ({
                    animation: 'none',
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#1273FE',
                    },
                    title: 'Xác thực tài khoản',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 17,
                    }
                })}/>
        </Stack.Navigator>
    )
}