import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from '../screen/Login/LoginScreen'
import OrderScreen from '../screen/Order/OrderScreen'
import TeacherScreen from '../screen/Teacher/TeacherScreen'
import StudentScreen from '../screen/Student/StudentScreen'
import VideoScreen from '../screen/Video/VideoScreen'
import DashBoardScreen from '../screen/DashBoardScreen'
import CourseScreen from '../screen/Course/CourseScreen'
const ScreenRoutes = () => {
  return (
   <Routes>
    <Route  path="/" element={<DashBoardScreen/>} />
    {/* <Route  path="/login" element={<LoginScreen/>} /> */}
    <Route  path="/Course" element={<CourseScreen/>} />
    <Route  path="/Order" element={<OrderScreen/>} />
    <Route  path="/Teacher" element={<TeacherScreen/>} />
    <Route  path="/Student" element={<StudentScreen/>} />
    <Route  path="/Video" element={<VideoScreen/>} />
   </Routes>
  )
}

export default ScreenRoutes