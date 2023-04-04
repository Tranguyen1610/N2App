import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigator from "./HomeNavigator"
import CoursesDetail from "../screens/CoursesDetail";
import VideoPreviewScreen from "../screens/VideoPreviewScreen";
import CardScreen from "../screens/CardScreen";
import SwitchNavigator from "./SwitchNavigator"
import SwitchStudent from './SwitchStudent';
import SwitchTeacher from './SwitchTeacher';
import TeacherAccountScreen from '../screens/TeacherAccountScreen';

const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ SwitchNavigator }
      screenOptions={() => ({
        headerShown: false,
        statusBarColor: "#0A0909",
        // navigationBarColor: "#1C1717",
      })}
    >
      <Stack.Screen name="SwitchNavigator" component={SwitchNavigator} />
      <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
      <Stack.Screen name="SwitchStudent" component={SwitchStudent} />
      <Stack.Screen name="SwitchTeacher" component={SwitchTeacher} />
      <Stack.Screen
        name="CoursesDetail"
        component={CoursesDetail}
        options={{
          animation: 'none'
        }} />
      <Stack.Screen
        name="VideoPreviewScreen"
        component={VideoPreviewScreen}
        options={{
          animation: 'none'
        }} />
      <Stack.Screen
        name="CardScreen"
        component={CardScreen}
        options={{
          animation: 'none',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: ''
        }} />
      <Stack.Screen
        name="TeacherAccountScreen"
        component={TeacherAccountScreen}
        options={{
          animation: 'none'
        }} />
      {/* <Stack.Screen name="ChattingScreen" component={ChattingScreen} />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={() => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: "#056282",
          },
          title: "Cài đặt",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 17,
          },
        })}
      />
      <Stack.Screen
        name="AddFriendScreen"
        component={AddFriendScreen}
        options={() => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: "#056282",
          },
          title: "Thêm bạn",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 17,
          },
        })}
      />
      <Stack.Screen
        name="MoreInfo"
        component={MoreInfo}
        options={() => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: "#056282",
          },
          title: "Tùy chọn",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 17,
          },
        })}
      />
      <Stack.Screen
        name="ManageMember"
        component={ManageMember}
        options={() => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: "#056282",
          },
          title: "Quản lý thành viên",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 17,
          },
        })}
      />
      <Stack.Screen
        name="FriendRequest"
        component={FriendRequest}
        options={() => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: "#056282",
          },
          title: "Lời mời kết bạn",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 17,
          },
        })}
      />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} /> */}
    </Stack.Navigator>
  );
};
// const styles = StyleSheet.create({
//   search_nav: {
//     display: "flex",
//     flexDirection: "row",
//     padding: 10,
//     justifyContent: "space-around",
//     alignItems: "center",
//   },
//   search_con: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   search_text: {
//     color: "#fff",
//     width: 300,
//     padding: 10,
//   },
// });

export default RootNavigator;
