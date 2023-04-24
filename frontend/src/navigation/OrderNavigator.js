import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import OrderSuccessScreen from '../screens/OrderSuccessScreen'
import OrderUnpaidScreen from '../screens/OrderUnpaidScreen'
import OrderCancelScreen from '../screens/OrderCancelScreen';

export default function OrderNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: '#0A0909' },
                tabBarLabelStyle: { color: '#fff',fontSize:12 },
                tabBarPressColor: '#1273FE',
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
            <Tab.Screen
                name='OrderCancelScreen'
                component={OrderCancelScreen}
                options={() => ({
                    tabBarLabel: 'Đã hủy',
                })} />
        </Tab.Navigator>
    )
}