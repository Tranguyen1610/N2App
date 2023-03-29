import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../contexts/AuthContext';
import FeaturedScreen from '../screens/FeaturedScreen';
import SearchScreen from '../screens/SearchScreen';
import MyLearningScreen from '../screens/MyLearningScreen';
import WishlishScreen from '../screens/WishlishScreen';
import AccountSceeen from '../screens/AccountSceeen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
export default function HomeScreen({ navigation }) {
    return (
        <Tab.Navigator
            initialRouteName={"Messages"}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name === "FeaturedScreen") {
                        iconName = focused ? require('../image/star.png') : require('../image/star_outline.png');
                    } else if (route.name === "SearchScreen") {
                        iconName = focused ? require('../image/search.png') : require('../image/search_outline.png');
                    } else
                        if (route.name === "MyLearningScreen") {
                            iconName = focused ? require('../image/open-book.png') : require('../image/open-book_outline.png');
                        } else
                            if (route.name === "WishlishScreen") {
                                iconName = focused ? require('../image/heart.png') : require('../image/heart_outline.png');
                            } else
                                if (route.name === "AccountSceeen") {
                                    iconName = focused ? require('../image/user.png') : require('../image/user_outline.png');
                                }
                    size = focused ? size + 5 : size + 2;
                    return <Image source={iconName} style={{ width: 25, height: 25 }} />
                },
                tabBarStyle: { height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C1717' },
                tabBarLabelStyle: { fontSize: 14, fontWeight: "700" },
                headerShown: true,
                headerTitle: () => {
                    let navName;
                    if (route.name === "FeaturedScreen") {
                        navName = '';
                    }
                    else if (route.name === "SearchScreen") {
                        navName = '';
                    } else
                        if (route.name === "MyLearningScreen") {
                            navName = 'Các khóa học của tôi';
                        } else
                            if (route.name === "WishlishScreen") {
                                navName = 'Wishlist';
                            }
                            else
                                if (route.name === "AccountSceeen") {
                                    navName = 'Tài khoản';
                                }
                    return <View className="flex-1 flex-row items-center">
                        <View className="w-10/12">

                            {route.name == "SearchScreen" ?
                                <View>
                                    <View className="flex-row p-2 bg-gray-500 rounded-md">
                                        <View className="w-1/12">
                                            <Ionicons name="search" size={24} color="white"  />
                                        </View>
                                        <TextInput className=" w-11/12 text-base px-2" placeholder='Tìm kiếm'>
                                        </TextInput>
                                    </View>
                                </View> :
                                <Text className="text-lg text-white font-bold">{navName}</Text>}
                        </View>
                        <View className="w-2/12 items-end">
                            <Ionicons name="cart-outline" size={30} color="white" />
                        </View>
                    </View>
                },
                headerStyle: {
                    backgroundColor: '#0A0909',
                }
            })} >
            <Tab.Screen
                name="FeaturedScreen"
                component={FeaturedScreen}
                options={{
                    title: "Nổi bật"
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    title: "Tìm kiếm"
                }}
            />
            <Tab.Screen
                name="MyLearningScreen"
                component={MyLearningScreen}
                options={{
                    title: "Học tập"
                }}
            />
            <Tab.Screen
                name="WishlishScreen"
                component={WishlishScreen}
                options={{
                    title: "Wishlist"
                }}
            />
            <Tab.Screen
                name="AccountSceeen"
                component={AccountSceeen}
                options={{
                    title: "Tài khoản"
                }}
            />
        </Tab.Navigator>
    );
}

