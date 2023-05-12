import { Avatar, Button, Space, Spin, Table, Typography } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DetailStudentModal } from './components/DetailStudentModal'
import { Url } from '../../contexts/constants'

const {Column}=Table
const StudentScreen = () => {
  const [dataSource,setDateSource]=useState([])
  const [loading,setLoading]=useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    setLoading(true);
    getAllUser()
  },[])
  const getAllUser = async () => {
    try {
      const res = await axios.get(`${Url}/api/user/getAll`);
      console.log("user data",res.data);
      // setListCourse(res.data);
      setDateSource(res.data)
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
       <Typography.Title level={4} >Học viên</Typography.Title>
      <Spin spinning={loading}>
        <Table
        dataSource={dataSource}
        loading={loading}
        >
          <Column
          align='center'
          title="Id"
          dataIndex=""
          render={(text,record)=>{
            return(
              <span>{record?._id}</span>
            )
          }}
          ></Column>
          <Column
           align='center'
          title="Hình đại diện"
          dataIndex=""
          render={(text,record)=>{
            return(
              <Avatar
              size={40}
              src={record?.pic}
              ></Avatar>
            )
          }}
          ></Column>
          <Column
          align='center'
          title="Tên Người dùng"
          dataIndex=""
          key={"user.name"}
          render={(text,record)=>{
            return(
              <span>{record?.Name}</span>
            )
          }}
          ></Column>
          <Column
           align='center'
          title="Email"
          dataIndex=""
          render={(text,record)=>{
            return(
              <span>{record?.Email}</span>
            )
          }}
          ></Column>
          <Column
          title="Chức vụ"
          dataIndex=""
          render={(text,record)=>{
            return(
              <span>{record?.IsTeacher=="STUDENT"?"Học viên":"Giảng viên"}</span>
            )
          }}
          ></Column>
          
          <Column
          title=""
          dataIndex="isHighlight"
          ></Column>
           <Column
              width={300}
              align="left"
              key="action"
              render={(text, record) => (
                <Space>
                  <Button
                    ghost
                    type="primary"
                    onClick={() => {
                      console.log("record",record);
                    setSelectedUser(record)
                     setVisible(true)
                    }}
                  >
                    Chi tiết
                  </Button>

                </Space>
              )}
            />
        </Table>
      </Spin>
      <DetailStudentModal
       visible={visible}
       onClose={()=>{setVisible(false)}}
       selectedUser={selectedUser}
      />
    </div>
  )
}

export default StudentScreen