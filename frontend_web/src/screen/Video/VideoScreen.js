import { Spin, Table, Typography } from 'antd'
import React from 'react'

const {Column}= Table
const VideoScreen = () => {
  return (
    <div>
       <Typography.Title level={4} >Video</Typography.Title>
      <Spin>
        <Table>
          <Column
          title="Tên Khóa học"
          dataIndex="Name"
          key={"course.name"}
          ></Column>
          <Column
          title="Giá"
          dataIndex="Price"
          ></Column>
          <Column
          title="Loại"
          dataIndex="Type"
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
    </div>
  )
}

export default VideoScreen