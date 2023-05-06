import { Spin, Table, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
const {Column}=Table;

const OrderScreen = () => {
  const [dataSource,setDateSource]=useState([])
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    setLoading(true)
    getAllOrder()
  },[])
  const getAllOrder = async () => {
    try {
      const res = await axios.get(`/api/order`);
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
       <Typography.Title level={4} >Order</Typography.Title>
      <Spin>
        <Table
        //  dataSource={dataSource}
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

export default OrderScreen