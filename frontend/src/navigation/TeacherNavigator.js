import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import TeacherAccountScreen from '../screens/TeacherAccountScreen';
import CoursesTeacherScreen from '../screens/CoursesTeacherScreen';
import RevenueTeacherScreen from '../screens/RevenueTeacherScreen';

const Tab = createBottomTabNavigator();
export default function TeacherNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name === "CoursesTeacherScreen") {
                        iconName = focused ? require('../image/learning.png') : require('../image/learning_outline.png');
                    } else if (route.name === "RevenueTeacherScreen") {
                        iconName = focused ? require('../image/money.png') : require('../image/money_outline.png');
                    } else
                        if (route.name === "TeacherAccountScreen") {
                            iconName = focused ? require('../image/user.png') : require('../image/user_outline.png');
                        }
                    size = focused ? size + 5 : size + 2;
                    return <Image source={iconName} style={{ width: 25, height: 25 }} />
                },
                tabBarStyle: { height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C1717' },
                tabBarLabelStyle: { fontSize: 14, fontWeight: "700", },
                headerShown: false,
            })} >
            <Tab.Screen
                name="CoursesTeacherScreen"
                component={CoursesTeacherScreen}
                options={{
                    title: "Tổng quan",
                    animation: "none",
                }}
            />
            <Tab.Screen
                name="RevenueTeacherScreen"
                component={RevenueTeacherScreen}
                options={{
                    title: "Doanh thu",
                    animation: "none",
                }}
            />
            <Tab.Screen
                name="TeacherAccountScreen"
                component={TeacherAccountScreen}
                options={{
                    title: "Tài khoản",
                    animation: "none",
                }}
            />
        </Tab.Navigator>
    );
}

