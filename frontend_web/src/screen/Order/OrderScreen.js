import { Button, Space, Spin, Table, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { OrderModal } from "./components/OrderModal";
import { Url } from "../../contexts/constants";
import { formatMoney } from "../../utils/format";
const { Column } = Table;

const OrderScreen = () => {
  const [dataSource, setDateSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setLoading(true);
    getAllOrder();
  }, []);
  const getAllOrder = async () => {
    try {
      const res = await axios.get(`${Url}/api/order`);
      // console.log(res.data);
      // setListCourse(res.data);
      setDateSource(res.data);
      setLoading(false);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Spin spinning={loading}>
        <Table
          pagination={{ pageSize: 6 }}
          dataSource={dataSource}
          loading={loading}
        >
          <Column
            align="center"
            title="Ngày tạo"
            dataIndex="createdAt"
            key={"course.name"}
          ></Column>
          <Column
            align="right"
            title="Tổng tiền"
            dataIndex="MoneyTotal"
            render={(text, record) => {
              return <Typography>{formatMoney(text)}</Typography>;
            }}
          ></Column>
          <Column
            align="right"
            title="Tổng tiền cuối cùng"
            dataIndex="MoneyFinal"
            render={(text, record) => {
              return <Typography>{formatMoney(text)}</Typography>;
            }}
          ></Column>
          <Column
            align="center"
            title="Loại thanh toán"
            dataIndex=""
            render={(text, record) => <span>{record.PayMentType?.Name}</span>}
          ></Column>
          <Column
            align="center"
            title="Người mua"
            dataIndex=""
            render={(text, record) => <span>{record.BuyerId?.Name}</span>}
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
                    setSelectedOrder(record);
                    setVisible(true);
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
        onClose={() => setVisible(false)}
      />
    </div>
  );
};

export default OrderScreen;
