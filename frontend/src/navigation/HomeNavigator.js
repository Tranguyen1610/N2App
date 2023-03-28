import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
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
                tabBarLabelStyle: { fontSize: 13, fontWeight: "700" },
                headerShown: true,
                headerTitle: () => {
                    // let iconHeader;
                    let navName;
                    if (route.name === "FeaturedScreen") {
                        navName = '';
                    }
                    else if (route.name === "SearchScreen") {
                        navName = '';
                    } else
                        if (route.name === "MyLearningScreen") {
                            // iconHeader = 'settings';
                            navName = 'Các khóa học của tôi';
                        } else
                            if (route.name === "WishlishScreen") {
                                // iconHeader = 'settings';
                                navName = 'Wishlist';
                        }
                            else
                                if (route.name === "AccountSceeen") {
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

