import { ShoppingCartOutlined } from '@ant-design/icons'
import { Card, Space, Statistic, Typography } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Url } from '../../contexts/constants'

function DashBoardScreen() {
  const [totalCourse, setTotalCourse] = useState()
  const [totalOrder, setTotalOrder] = useState()
  const [totalVideo, setTotalVideo] = useState()
  const [totalStudent, setTotalStudent] = useState()
  const [totalTeacher, setTotalTeacher] = useState()
  const [dataUser, setDataUser] = useState([])
  useEffect(() => {
    getCourse()
    getAllOrder()
    getAllVideo()
    getAllUser()
    getTotalStudent()
    getTotalTeacher()
  }, [
    totalCourse, totalOrder, totalStudent, totalTeacher, totalVideo
  ])
  const fetchData = async () => {
    try {
      getCourse()
      getAllOrder()
      getAllVideo()
      getAllUser()

    } catch (error) {

    }
  }
  const getAllUser = async () => {
    try {
      const res = await axios.get(`${Url}/api/user/getAll`);
      getTotalStudent(res.data)
      getTotalTeacher(res.data)
      setDataUser(res.data)
    } catch (err) {
      console.log(err);
    }
  }
  const getTotalStudent = (data) => {
    const temp = dataUser.filter((item) => item?.IsTeacher === "STUDENT")
    console.log("totalStudent", temp.length);
    setTotalStudent(temp.length)
  }
  const getTotalTeacher = (data) => {
    const temp = dataUser.filter((item) => item?.IsTeacher !== "STUDENT")
    console.log("totalTeacher", temp.length);
    setTotalTeacher(temp.length)
  }
  const getAllVideo = async () => {
    try {
      const res = await axios.get(`${Url}/api/video/`);
      console.log("totalVideo", res.data.length);
      setTotalVideo(res.data.length)
    } catch (err) {
      console.log(err);
    }
  }
  const getCourse = async () => {
    try {
      const res = await axios.get(`${Url}/api/course/`);
      // console.log(res.data);
      // setListCourse(res.data);
      console.log("totalCourse", res.data.length);
      setTotalCourse(res.data.length)
    } catch (err) {
      console.log(err);
    }
  }
  const getAllOrder = async () => {
    try {
      const res = await axios.get(`${Url}/api/order`);
      // console.log(res.data);
      // setListCourse(res.data);
      console.log("totalOrder", res.data.length);
      setTotalOrder(res.data.length)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <Typography.Title level={4}>DashBoard</Typography.Title>
      <Space direction='horizontal'>
        <DashBoardCard
          icon={<ShoppingCartOutlined
            style={{
              color: "green",
              backgroundColor: "rgb(0,255,0,0.5)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8
            }}
          />} title={"Khóa học"} value={totalCourse} />
        <DashBoardCard
          icon={<ShoppingCartOutlined
            style={{
              color: "green",
              backgroundColor: "rgb(0,255,0,0.5)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8
            }}
          />} title={"Đơn hàng"} value={totalOrder} />
        <DashBoardCard
          icon={<ShoppingCartOutlined
            style={{
              color: "green",
              backgroundColor: "rgb(0,255,0,0.5)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8
            }}
          />} title={"Video"} value={totalVideo} />

        <DashBoardCard
          icon={<ShoppingCartOutlined
            style={{
              color: "green",
              backgroundColor: "rgb(0,255,0,0.5)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8
            }}
          />} title={"Học viên"} value={totalStudent} />
        <DashBoardCard
          icon={<ShoppingCartOutlined
            style={{
              color: "green",
              backgroundColor: "rgb(0,255,0,0.5)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8
            }}
          />} title={"Giảng viên"} value={totalTeacher} />
      </Space>
    </div>
  )
}
const DashBoardCard = ({ title, value, icon }) => {
  return (
    <Card>
      <Space direction='horizontal'>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  )
}

export default DashBoardScreen