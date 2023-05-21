import { AppstoreOutlined, ShopOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function SideMenu() {
  const navigate = useNavigate()
  return (
    <div className='SideMenu'>
      <Menu
      className='Menu'
      onClick={(item)=>{
        //item,key
        navigate(item.key)
      }}
      items={[
        {
          label:"DashBoard",
          icon:<AppstoreOutlined/>,
          key:"/"
        },
        {
          label:"Khóa học",
          key:"/Course",
          icon:<ShopOutlined/>
        },
        {
          label:"Hóa đơn",
          key:"/Order",
          icon:<ShopOutlined/>
        },
        {
          label:"Video",
          key:"/Video",
          icon:<AppstoreOutlined/>
        },
        {
          label:"Người dùng",
          key:"/Student",
          icon:<AppstoreOutlined/>
        }
      ]}>

      </Menu>
    </div>
  )
}

export default SideMenu