
import { BellFilled, LogoutOutlined, MailFilled } from '@ant-design/icons'
import { Badge, Button, Drawer, Image, List, Space, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios';
import { ItemRequest } from './components/ItemRequest';
import icon from "../../image/icon.png"
import { Url } from '../../contexts/constants';

function AppHeader() {
  const {logout} = useContext(AuthContext);
  const [requestOpen,setRequestOpen]=useState(false);
  const [dataRequest,setDataRequest]= useState([]);
  const [totalRequestNoProgress,setTotalRequestNoProgress]=useState();
  const [notificationOpen,setNotificationOpen]=useState(false)
  const handlelogout = async() =>{
    await logout()
    window.location.reload(false);
  }
  useEffect(()=>{
    getAllRequest()
    // TotalRequestNoProgress()
  },[totalRequestNoProgress])
  const getAllRequest = async()=>{
    try{
      const res = await axios.get(`${Url}/api/request`)
      console.log("request:",res.data);
      TotalRequestNoProgress(res.data)
      setDataRequest(res.data)
    }catch(err){

    }
  }
  const TotalRequestNoProgress = async(data)=>{
    const temp  = data.filter((item)=>item?.Status==false&&item?.IsCancel==false)
    console.log("requet lenght",temp.length);
    setTotalRequestNoProgress(temp.length)
  }
  return (
    <div className='AppHeader'>
      <Image
        style={{borderRadius:100}}
        width={40}
        src={icon}
      >
      </Image>
      {/* <Typography.Title>N2App's Admin</Typography.Title> */}
      <div className="title">N2App's Admin</div>
      <Space>
       
        <Badge count={totalRequestNoProgress!=0?totalRequestNoProgress:null} >
          <MailFilled style={{ fontSize: 24 }} onClick={()=>{setRequestOpen(true)}}/>
        </Badge>
        <Badge dot={totalRequestNoProgress!=0?true:false}>
          <BellFilled style={{ fontSize: 24 }} />
        </Badge>
        <Drawer 
        title="Yêu cầu"
         open={requestOpen}
         onClose={()=>{setRequestOpen(false)}}
         maskClosable
         >
         <List
         dataSource={dataRequest}
         renderItem={ItemRequest}
         ></List> 
        </Drawer>
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