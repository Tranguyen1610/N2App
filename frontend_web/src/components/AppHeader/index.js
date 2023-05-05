
import { BellFilled, MailFilled } from '@ant-design/icons'
import { Badge, Image, Space, Typography } from 'antd'
import React from 'react'

function AppHeader() {
  return (
    <div className='AppHeader'>
      <Image
      width={40}
      src='https://www.freepnglogos.com/uploads/logo-website-png/logo-website-website-tools-design-website-name-logo-posters-and-25.png'
      >
      </Image>
    <Typography.Title>N2App's Dashboard</Typography.Title>
    <Space>
      <Badge count={20} dot>
      <MailFilled style={{fontSize:24}}/>
      </Badge>
      <Badge count={20}>
      <BellFilled style={{fontSize:24}}/>
      </Badge>
    </Space>
    </div>
  )
}

export default AppHeader