import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import OrderSuccessScreen from '../screens/OrderSuccessScreen'
import OrderUnpaidScreen from '../screens/OrderUnpaidScreen'
import OrderCancelScreen from '../screens/OrderCancelScreen';
import RequestAcceptScreen from '../screens/RequestAcceptScreen';
import RequestNoProcessScreen from '../screens/RequestNoProcessScreen';

export default function RequestNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: '#0A0909' },
                tabBarLabelStyle: { color: '#fff',fontSize:12 },
                tabBarPressColor: '#1273FE',
            }}>
            <Tab.Screen
                name='RequestAcceptScreen'
                component={RequestAcceptScreen}
                options={() => ({
                    tabBarLabel: 'Đã xử lý',
                })} />
            <Tab.Screen
                name='RequestNoProcessScreen'
                component={RequestNoProcessScreen}
                options={() => ({
                    tabBarLabel: 'Chưa xử lý',
                })} />
        </Tab.Navigator>
    )
}