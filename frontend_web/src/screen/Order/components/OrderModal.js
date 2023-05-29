import { Col, Descriptions, Modal, Spin, Table, Typography } from "antd";
import React, { useEffect } from "react";
import { formatMoney } from "../../../utils/format";

const { Column } = Table;

export const OrderModal = ({ selectedOrder, visible, onClose, onSubmitOk }) => {
  useEffect(() => {
    console.log("data:", selectedOrder);
  });

  return (
    <Modal
      onCancel={onClose}
      open={visible}
      title={
        <>
          Chi tiết đơn hàng{" "}
          <span className="text-primary">{selectedOrder?._id}</span>
        </>
      }
      style={{ top: 20 }}
      width={1000}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <Col span={12}>
          <Descriptions
            column={1}
            title="Thông tin đơn hàng"
            contentStyle={{ fontWeight: "bold" }}
          >
            <Descriptions.Item label="Đơn hàng">
              <span>{selectedOrder?._id}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian tạo">
              <span>{selectedOrder?.createdAt}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Phương thức thanh toán">
              <span>{selectedOrder?.PayMentType?.Name}</span>
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Descriptions
            column={1}
            title="Thông tin khách hàng"
            contentStyle={{ fontWeight: "bold" }}
          >
            <Descriptions.Item label="Tên khách hàng">
              <span>{selectedOrder?.BuyerId?.Name}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <span>{selectedOrder?.BuyerId?.Email}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              <span>{selectedOrder?.BuyerId?.DateOfBirth}</span>
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </div>
      <Col>
        <Spin spinning={false}>
          <Table
            pagination={false}
            dataSource={selectedOrder?.Detail}
            // loading={loading}
          >
            <Column
              title="Tên Khóa học"
              dataIndex="Name"
              key={"course.name"}
            ></Column>
            <Column
              title="Giá"
              dataIndex="Price"
              render={(text, record) => {
                return <Typography>{formatMoney(text)}</Typography>;
              }}
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
      </Col>
    </Modal>
  );
};
