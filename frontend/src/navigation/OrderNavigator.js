import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import OrderSuccessScreen from '../screens/OrderSuccessScreen'
import OrderUnpaidScreen from '../screens/OrderUnpaidScreen'

export default function OrderNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle:{backgroundColor:'#0A0909'},
                tabBarLabelStyle:{color:'#fff'},
                tabBarPressColor:'#1273FE',
            }}>
            <Tab.Screen
                name='OrderSuccessScreen'
                component={OrderSuccessScreen}
                options={() => ({
                    tabBarLabel: 'Đã hoàn thành',
                })} />
            <Tab.Screen
                name='OrderUnpaidScreen'
                component={OrderUnpaidScreen}
                options={() => ({
                    tabBarLabel: 'Chưa thanh toán',
                })} />
        </Tab.Navigator>
    )
}