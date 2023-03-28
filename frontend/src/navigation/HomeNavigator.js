import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../contexts/AuthContext';
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import Screen3 from '../screens/Screen3';
import Screen4 from '../screens/Screen4';
import Screen5 from '../screens/Screen5';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
export default function HomeScreen({ navigation }) {
    return (
        <Tab.Navigator
            initialRouteName={"Messages"}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name === "Screen1") {
                        iconName = focused ? require('../image/star.png') : require('../image/star_outline.png');
                    } else if (route.name === "Screen2") {
                        iconName = focused ? require('../image/search.png') : require('../image/search_outline.png');
                    } else
                        if (route.name === "Screen3") {
                            iconName = focused ? require('../image/open-book.png') : require('../image/open-book_outline.png');
                        } else
                            if (route.name === "Screen4") {
                                iconName = focused ? require('../image/heart.png') : require('../image/heart_outline.png');
                            } else
                                if (route.name === "Screen5") {
                            iconName = focused ? require('../image/user.png') : require('../image/user_outline.png');
                        }
                    size = focused ? size + 5 : size + 2;
                    return <Image source={iconName} style={{ width: 25, height: 25 }} />
                },
                tabBarStyle: { height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C1717' },
                tabBarLabelStyle: { fontSize: 13, fontWeight: "700" },
                headerShown: true,
                headerTitle: () => {
                    // let iconHeader;
                    let navName;
                    if (route.name === "Screen1") {
                        navName = '';
                    }
                    else if (route.name === "Screen2") {
                        navName = '';
                    } else
                        if (route.name === "Screen3") {
                            // iconHeader = 'settings';
                            navName = 'Các khóa học của tôi';
                        } else
                            if (route.name === "Screen4") {
                                // iconHeader = 'settings';
                                navName = 'Wishlist';
                        }
                            else
                                if (route.name === "Screen5") {
                                    // iconHeader = 'settings';
                                    navName = 'Tài khoản';
                                }
                    return <View className="flex-1 flex-row items-center ">
                        <Text className="text-lg text-white font-bold">{navName}</Text>
                        <View className="">
                            <Ionicons name="cart-outline" size={30} color="#9D9D9D" />
                        </View>
                        
                    </View>
                },
                headerStyle: {
                    // backgroundColor: '#056282',
                    backgroundColor: '#0A0909',
                }
            })} >
            <Tab.Screen
                name="Screen1"
                component={Screen1}
                options={{
                    title: "Nổi bật"
                }}
            />
            <Tab.Screen
                name="Screen2"
                component={Screen2}
                options={{
                    title: "Tìm kiếm"
                }}
            />
            <Tab.Screen
                name="Screen3"
                component={Screen3}
                options={{
                    title: "Học tập"
                }}
            />
            <Tab.Screen
                name="Screen4"
                component={Screen4}
                options={{
                    title: "Wishlist"
                }}
            />
            <Tab.Screen
                name="Screen5"
                component={Screen5}
                options={{
                    title: "Tài khoản"
                }}
            />
        </Tab.Navigator>
    );
}

