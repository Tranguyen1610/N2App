import React from 'react'
import AppHeader from '../components/AppHeader'
import { Space } from 'antd'
import SideMenu from '../components/SideMenu'
import PageContent from '../components/PageContent'
import AppFooter from '../components/AppFooter'
import '../App.css'
const MainScreen = () => {
  return (
    <div className='Main'>
    <AppHeader/>
    <Space className='SideMenuAndPageContent'>
    <SideMenu></SideMenu>
    <PageContent></PageContent>
    </Space>
    <AppFooter/>
    </div>
  )
}

export default MainScreen