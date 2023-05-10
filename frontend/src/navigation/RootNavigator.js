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
import AddCourseScreen from '../screens/AddCourseScreen';
import AddVideoScreen from '../screens/AddVideoScreen';
import AddCourseStep2Screen from '../screens/AddCourseStep2Screen';
import PaymentScreen from '../screens/PaymentScreen';
import OrderScreen from '../screens/OrderScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import AllCourseTeacher from '../screens/AllCourseTeacher';
import AllCourseTeacherUnFinish from '../screens/AllCourseTeacherUnFinish';
import ResultPayment from '../screens/ResultPayment';
import AllCourseTeacherNS from '../screens/AllCourseTeacherNS';
import CoursesDetailTeacher from '../screens/CoursesDetailTeacher';
import EditCourseScreen from '../screens/EditCourseScreen';
import ListVideoScreen from '../screens/ListVideoScreen';
import RequestScreen from '../screens/RequestScreen';
import CreateRequest from '../screens/CreateRequest';

const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={SwitchNavigator}
      screenOptions={() => ({
        headerShown: false,
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
        name="CoursesDetailTeacher"
        component={CoursesDetailTeacher}
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
          title: 'Giỏ hàng'
        }} />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          animation: 'none',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: 'Thanh toán'
        }} />
      <Stack.Screen
        name="TeacherAccountScreen"
        component={TeacherAccountScreen}
        options={{
          animation: 'none'
        }} />
      <Stack.Screen
        name="AddCourseScreen"
        component={AddCourseScreen}
        options={{
          animation: 'none',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: 'Tạo khóa học mới'
        }} />
      <Stack.Screen
        name="AddCourseStep2Screen"
        component={AddCourseStep2Screen}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: 'Tạo khóa học mới'
        }} />
      <Stack.Screen
        name="CreateRequest"
        component={CreateRequest}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: 'Tạo yêu cầu'
        }} />
      <Stack.Screen
        name="AddVideoScreen"
        component={AddVideoScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: 'Thêm video'
        }} />
      <Stack.Screen
        name="EditCourseScreen"
        component={EditCourseScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: 'Chỉnh sửa khóa học'
        }} />
      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: 'Đơn hàng'
        }} />
      <Stack.Screen
        name="RequestScreen"
        component={RequestScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: 'Yêu cầu'
        }} />
      <Stack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: 'Chi tiết đơn hàng'
        }} />
      <Stack.Screen
        name="AllCourseTeacher"
        component={AllCourseTeacher}
        options={{
          animation: 'none',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: 'Đang bán'
        }} />
      <Stack.Screen
        name="AllCourseTeacherNS"
        component={AllCourseTeacherNS}
        options={{
          animation: 'none',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: 'Chưa bán'
        }} />
      <Stack.Screen
        name="AllCourseTeacherUnFinish"
        component={AllCourseTeacherUnFinish}
        options={{
          animation: 'none',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: 'Chưa hoàn tất'
        }} />
      <Stack.Screen
        name="ResultPayment"
        component={ResultPayment}
        options={{
          animation: 'none',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: 'Kết quả thanh toán'
        }} />
      <Stack.Screen
        name="ListVideoScreen"
        component={ListVideoScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          headerStyle: { backgroundColor: '#0A0909' },
          headerTintColor: '#ffffff',
          title: 'Danh sách  video'
        }} />

    </Stack.Navigator>
  );
};

export default RootNavigator;
