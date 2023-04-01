import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../contexts/AuthContext';
import SearchScreen from '../screens/SearchScreen';
import MyLearningScreen from '../screens/MyLearningScreen';
import AccountSceeen from '../screens/AccountSceeen';
import { Ionicons } from '@expo/vector-icons';
import CustomFeatureNavigator from './CustomFeatureNavigator';
import WishlistScreen from '../screens/WishlistScreen';

const Tab = createBottomTabNavigator();
export default function HomeScreen() {
    return (
        <Tab.Navigator
            initialRouteName={"Messages"}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name === "CustomFeatureNavigator") {
                        iconName = focused ? require('../image/star.png') : require('../image/star_outline.png');
                    } else if (route.name === "SearchScreen") {
                        iconName = focused ? require('../image/search.png') : require('../image/search_outline.png');
                    } else
                        if (route.name === "MyLearningScreen") {
                            iconName = focused ? require('../image/open-book.png') : require('../image/open-book_outline.png');
                        } else
                            if (route.name === "WishlistScreen") {
                                iconName = focused ? require('../image/heart.png') : require('../image/heart_outline.png');
                            } else
                                if (route.name === "AccountSceeen") {
                                    iconName = focused ? require('../image/user.png') : require('../image/user_outline.png');
                                }
                    size = focused ? size + 5 : size + 2;
                    return <Image source={iconName} style={{ width: 25, height: 25 }} />
                },
                tabBarStyle: {height:60,justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C1717'},
                tabBarLabelStyle: { fontSize: 14, fontWeight: "700",},
                headerShown: false,
            })} >
            <Tab.Screen
                name="CustomFeatureNavigator"
                component={CustomFeatureNavigator}
                options={{
                    title: "Nổi bật",
                    animation: "none"
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    title: "Tìm kiếm",
                    animation: "none",
                }}
            />
            <Tab.Screen
                name="MyLearningScreen"
                component={MyLearningScreen}
                options={{
                    title: "Học tập",
                    animation: "none",
                }}
            />
            <Tab.Screen
                name="WishlistScreen"
                component={WishlistScreen}
                options={{
                    title: "Wishlist",
                    animation: "none",
                }}
            />
            <Tab.Screen
                name="AccountSceeen"
                component={AccountSceeen}
                options={{
                    title: "Tài khoản",
                    animation: "none",
                }}
            />
        </Tab.Navigator>
    );
}

