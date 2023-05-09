import { Button, Space, Spin, Table, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { OrderModal } from './components/OrderModal';
const {Column}=Table;

const OrderScreen = () => {
  const [dataSource,setDateSource]=useState([])
  const [loading,setLoading]=useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [visible, setVisible] = useState(false);
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
      <Spin spinning={loading}>
        <Table
          dataSource={dataSource}
         loading={loading}
        >
          <Column
          align='center'
          title="Ngày tạo"
          dataIndex="createdAt"
          key={"course.name"}
          ></Column>
          <Column
          align='right'
          title="Tổng tiền"
          dataIndex="MoneyTotal"
          ></Column>
          <Column
           align="right"
          title="Tổng tiền cuối cùng"
          dataIndex="MoneyFinal"
          ></Column>
          <Column
          align='center'
          title="Loại thanh toán"
          dataIndex=""
          render={(text,record)=>(
            <span>{record.PayMentType?.Name}</span>
          )}
          ></Column>
          <Column
          align='center'
          title="Người mua"
          dataIndex=""
          render={(text,record)=>(
            <span>{record.BuyerId?.Name}</span>
          )}
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
                    setSelectedOrder(record)
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
      <OrderModal
      visible={visible}
      selectedOrder={selectedOrder}
      onClose={()=>setVisible(false)}
      />
    </div>
  )
}

export default OrderScreen