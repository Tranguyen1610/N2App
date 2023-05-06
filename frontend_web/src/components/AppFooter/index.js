
import { Typography } from 'antd'
import React from 'react'

function AppFooter() {
  return (
    <div className='AppFooter'>
      <Typography.Link href='tel:+123456789'>
        +123456789
      </Typography.Link>
      <Typography.Link href='https://www.google.com' target={'_blank'}>
        Privacy Police
      </Typography.Link>
      <Typography.Link href='https://www.youtube.com' target={'_blank'}> 
        Terms of Use
      </Typography.Link>
    </div>
  )
}

export default AppFooter