import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../contexts/AuthContext';

const Tab = createBottomTabNavigator();
export default function HomeScreen({ navigation }) {
    return (
        <Tab.Navigator
            initialRouteName={"Messages"}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name === "Messages") {
                        iconName = focused ? require('../image/chat.png') : require('../image/chat_outline.png');
                    } else if (route.name === "Contacts") {
                        iconName = focused ? require('../image/contact.png') : require('../image/contact_outline.png');
                    } else
                        if (route.name === "Me") {
                            iconName = focused ? require('../image/user.png') : require('../image/user_outline.png');
                        }
                    size = focused ? size + 5 : size + 2;
                    // return <MaterialCommunityIcons name={iconName} size={size} color={color}/>
                    return <Image source={iconName} style={{ width: 30, height: 30 }} />
                },
                tabBarStyle: { padding: 10, height: 60, },
                tabBarLabelStyle: { fontSize: 15 },
                tabBarActiveTintColor: '#056282',
                headerShown: true,
                headerTitle: () => {
                    let iconHeader;
                    let navName;
                    if (route.name === "Messages") {
                        iconHeader = 'add';
                        navName = 'add';
                    }
                    else if (route.name === "Contacts") {
                        iconHeader = 'person-add';
                        navName = 'AddFriendScreen';
                    } else
                        if (route.name === "Me") {
                            iconHeader = 'settings';
                            navName = 'SettingScreen';
                        }
                    return <View style={styles.search_nav}>
                        <TouchableOpacity
                            onPress={()=>navigation.navigate('SearchScreen')}
                            style={styles.search_con}>
                            <Ionicons
                                name='search-outline'
                                size={25}
                                color={'#fff'} />
                            <Text style={styles.search_text}>Tìm kiếm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navName != 'add' ?
                                navigation.navigate(navName) :
                                setModalVisible(true)
                            }}>
                            <MaterialIcons
                                name={iconHeader}
                                size={25}
                                color={'#fff'} />
                        </TouchableOpacity>
                        
                    </View>
                },
                headerStyle: {
                    backgroundColor: '#056282',
                }
            })} >
            <Tab.Screen
                name="Messages"
                component={MessagesScreen}
                options={{
                    title:"Tin nhắn",
                }}
            />
            <Tab.Screen
                name="Contacts"
                component={ContactsScreen}
                options={{
                    title:"Liên hệ"
                }}
            />
            <Tab.Screen
                name="Me"
                component={MeScreen}
                options={{
                    title:"Cá nhân"
                }}
            />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    search_nav: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    search_con: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search_text: {
        color: '#fff',
        width: 300,
        padding: 10,
    },
    centered_view: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        margin: 10,
        // backgroundColor: '#00000099',
    },
    modal_cont: {
        width: 200,
        backgroundColor: '#ffffff',
        borderRadius: 5,
    },
    modal_body: {
        padding: 10,
    },
    choose: {
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text_choose: {
        marginLeft: 15,
        fontSize: 16,
    }
});
