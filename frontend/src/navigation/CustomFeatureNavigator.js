import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeaturedScreen from '../screens/FeaturedScreen';
import AllTypeScreen from '../screens/AllTypeScreen';
import { AuthContext } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import HeaderTitle from '../components/HeaderTitle'
import ProposalScreen from '../screens/ProposalScreen';
import CourseOfTypeScreen from '../screens/CourseOfTypeScreen';

const Stack = createNativeStackNavigator();

export default function CustomFeatureNavigator() {
    
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
            })}>
            <Stack.Screen
                name="FeaturedScreen"
                component={FeaturedScreen}
                options={{
                    animation: "none",
                    
                }}
            />
            <Stack.Screen
                name="AllTypeScreen"
                component={AllTypeScreen}
                options={{
                    animation: "none",

                }}
            />
            <Stack.Screen
                name="ProposalScreen"
                component={ProposalScreen}
                options={{
                    animation: "none",

                }}
            />
            <Stack.Screen
                name="CourseOfTypeScreen"
                component={CourseOfTypeScreen}
                options={{
                    animation: "none",

                }}
            />
        </Stack.Navigator>
    )
}