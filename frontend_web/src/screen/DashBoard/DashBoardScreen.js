import { ShoppingCartOutlined } from '@ant-design/icons'
import { Card, Space, Statistic, Typography } from 'antd'
import React from 'react'

function DashBoardScreen() {
  return (
    <div>
      <Typography.Title level={4}>DashBoard</Typography.Title>
      <Space direction='horizontal'>
        <DashBoardCard 
        icon={<ShoppingCartOutlined
        style={{
          color:"green",
          backgroundColor:"rgb(0,255,0,0.5)",
          borderRadius:20,
          fontSize:24,
          padding:8
        }}
        />} title={"Khóa học"} value={12345}/>
        <DashBoardCard 
        icon={<ShoppingCartOutlined
        style={{
          color:"green",
          backgroundColor:"rgb(0,255,0,0.5)",
          borderRadius:20,
          fontSize:24,
          padding:8
        }}
        />} title={"Đơn hàng"} value={12345}/>
        <DashBoardCard 
        icon={<ShoppingCartOutlined
        style={{
          color:"green",
          backgroundColor:"rgb(0,255,0,0.5)",
          borderRadius:20,
          fontSize:24,
          padding:8
        }}
        />} title={"Video"} value={12345}/>
      
      <DashBoardCard 
        icon={<ShoppingCartOutlined
        style={{
          color:"green",
          backgroundColor:"rgb(0,255,0,0.5)",
          borderRadius:20,
          fontSize:24,
          padding:8
        }}
        />} title={"Học viên"} value={12345}/>
        <DashBoardCard 
        icon={<ShoppingCartOutlined
        style={{
          color:"green",
          backgroundColor:"rgb(0,255,0,0.5)",
          borderRadius:20,
          fontSize:24,
          padding:8
        }}
        />} title={"Giảng viên"} value={12345}/>
        </Space>
    </div>
  )
}
const DashBoardCard=({title,value,icon})=>{
  return(
    <Card>
      <Space direction='horizontal'>
        {icon}
        <Statistic title={title} value={value}/>
      </Space>
    </Card>
  )
}

export default DashBoardScreen