import { AppstoreOutlined, ShopOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function SideMenu() {
  const navigate = useNavigate()
  return (
    <div className='SideMenu'>
      <Menu
      onClick={(item)=>{
        //item,key
        navigate(item.key)
      }}
      items={[
        {
          label:"Dashboard",
          icon:<AppstoreOutlined/>,
          key:"/"
        },
        {
          label:"Course",
          key:"/Course",
          icon:<ShopOutlined/>
        },
        {
          label:"Order",
          key:"/Order",
          icon:<ShopOutlined/>
        },
        {
          label:"Video",
          key:"/Video",
          icon:<AppstoreOutlined/>
        },
        {
          label:"Teacher",
          key:"/Teacher",
          icon:<AppstoreOutlined/>
        },
        {
          label:"Student",
          key:"/Student",
          icon:<AppstoreOutlined/>
        }
      ]}>

      </Menu>
    </div>
  )
}

export default SideMenu