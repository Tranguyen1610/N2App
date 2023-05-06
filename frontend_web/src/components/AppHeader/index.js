
import { BellFilled, LogoutOutlined, MailFilled } from '@ant-design/icons'
import { Badge, Button, Image, Space, Typography } from 'antd'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'

function AppHeader() {
  const {logout} = useContext(AuthContext);
  const handlelogout = async() =>{
    await logout()
    window.location.reload(false);
  }
  return (
    <div className='AppHeader'>
      <Image
        width={40}
        src='https://www.freepnglogos.com/uploads/logo-website-png/logo-website-website-tools-design-website-name-logo-posters-and-25.png'
      >
      </Image>
      {/* <Typography.Title>N2App's Admin</Typography.Title> */}
      <div className="title">N2App's Admin</div>
      <Space>
        <Badge count={20} dot>
          <MailFilled style={{ fontSize: 24 }} />
        </Badge>
        <Badge count={20}>
          <BellFilled style={{ fontSize: 24 }} />
        </Badge>
        <Button
          style={{
            marginLeft:10
          }}
          onClick={handlelogout}>
            Đăng xuất</Button>
      </Space>
    </div>
  )
}

export default AppHeader