import { Spin, Table, Typography } from 'antd'
import React, { useEffect } from 'react'
import { Url } from '../../contexts/constants';
import axios from 'axios';
import { useState } from 'react';
const {Column}=Table;
function CourseScreen() {
  const [dataSource,setDateSource]=useState([])
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    setLoading(true)
    getCourse();
  },[])
  const getCourse = async () => {
    try {
      const res = await axios.get(`/api/course/`);
      // console.log(res.data);
      // setListCourse(res.data);
      setDateSource(res.data)
      setLoading(false)
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <Typography.Title level={4} >Course</Typography.Title>
      <Spin spinning={loading}>
        <Table
        dataSource={dataSource}
        loading={loading}
        >
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
          dataIndex=""
          render={(text, record) => (
            <span>{record.Type?.Name}</span>
  )}
          ></Column>
          <Column
          title="Đánh giá"
          dataIndex=""
          ></Column>
          {/* <Column
          title="Nổi bật"
          dataIndex="isHighlight"
          ></Column>
          <Column
          title="Trạng thái"
          dataIndex="isActive"
          ></Column> */}
        </Table>
      </Spin>
    </div>
  )
}

export default CourseScreen