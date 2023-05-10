import { Button, Space, Spin, Table, Typography } from 'antd'
import Link from 'antd/es/typography/Link'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { VideoModal } from '../Course/components/VideoModal'
import { PlusOutlined } from '@ant-design/icons'

const {Column}= Table
const VideoScreen = () => {
  const [dataSource,setDateSource]=useState([])
  const [loading,setLoading]=useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    setLoading(true)
    getAllVideo()
  },[])
  const getAllVideo = async () => {
    try {
      const res = await axios.get(`/api/video/`);
      console.log("video data",res.data);
      // setListCourse(res.data);
      setDateSource(res.data)
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
       <Typography.Title level={4} >Video</Typography.Title>
       <Space>
      <Button
                onClick={() => {
                  setVisible(true)
                }}
                type="primary"
                icon={<PlusOutlined />}
              >
                Thêm mới
              </Button>
      </Space>
      <Spin spinning={loading}>
        <Table
        dataSource={dataSource}
        loading={loading}
        >
          <Column
          title="Tên Khóa học"
          dataIndex=""
          key={"course.name"}
          render={(text,record)=>{
            return(
              <span>{record?.CourseId?.Name}</span>
            )
          }}
          ></Column>
          <Column
          width={70}
          title="Tên Video"
          dataIndex="Name"
          key={"video.name"}
          render={(text,record)=>{
            return(
             <Link
            onClick={()=>{
                setVisible(true)
                setSelectedCourse(record)
                console.log("link video",record);
            }}
            >
            {`${text}`}
            </Link>)
          }}
          ></Column>
          <Column
          align='center'
          title="Mô tả"
          dataIndex="Description"
          ></Column>
          <Column
          title="Loại"
          dataIndex=""
          render={(text,record)=>{
            return(

              <span>{record?.CourseId?.Type}</span>
            )
          }}
          ></Column>
          <Column
          title="Đánh giá"
          dataIndex=""
          ></Column>
          <Column
          title="Nổi bật"
          dataIndex="isHighlight"
          ></Column>
          <Column
          title="Trạng thái"
          dataIndex="isActive"
          ></Column>
        </Table>
      </Spin>
      <VideoModal
      visible={visible}
      onClose={()=>{setVisible(false)}}
      selectedOrder={selectedCourse}
      />
    </div>
  )
}

export default VideoScreen