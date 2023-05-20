import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Image,
  Modal,
  Spin,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { VideoModal } from "./VideoModal";
import Link from "antd/es/typography/Link";
import axios from "axios";
import { Url } from "../../../contexts/constants";

const { Column } = Table;

export const DetailCourseModal = ({
  dataRequest,
  isCancel,
  idRequest,
  selectedOrder,
  visible,
  onClose,
  onSubmitOk,
}) => {
  const [visibleVideo, setVisibleVideo] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(selectedOrder?.onSale);
  const [isHidden, setIsHidden] = useState();
  useEffect(() => {
    console.log("dataCourseOfStudent:", selectedOrder?._id);
  });

  const acceptRequest = async (id) => {
    try {
      const res = await axios.put(`${Url}/api/request/acceptRequest/${id}`);
      if (res) setIsHidden(false);
      window.location.reload(false);
    } catch (err) {}
  };
  const denyRequest = async (id) => {
    try {
      const res = await axios.put(`${Url}/api/request/denyRequest/${id}`);
      if (res) setIsHidden(false);
      window.location.reload(false);
    } catch (err) {}
  };
  return (
    <div>
      <Modal
        cancelText={"Thoát"}
        onCancel={onClose}
        okButtonProps={{
          hidden: true,
        }}
        open={visible}
        title={<>Thông tin khóa học</>}
        style={{ top: 20 }}
        width={1000}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <Col span={12}>
            <Descriptions column={1} contentStyle={{ fontWeight: "bold" }}>
              <Descriptions.Item label="Mã khóa học">
                <span>{selectedOrder?._id}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Tên khóa học">
                <span>{selectedOrder?.Name}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Thể loại">
                <span>{selectedOrder?.Type?.Name}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <span style={{ color: "red" }}>
                  {selectedOrder?.OnSale == false ? "Chưa bán" : "Đang bán"}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions column={1} contentStyle={{ fontWeight: "bold" }}>
              <Descriptions.Item label="Giảng viên">
                <span>{selectedOrder?.Teacher?.Name}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <span>{selectedOrder?.Teacher?.Email}</span>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </div>
        <Col>
          <Spin spinning={false}>
            <Table
              pagination={false}
              dataSource={selectedOrder?.ListVideo}
              // loading={loading}
            >
              <Column
                title="Video bài giảng"
                dataIndex="Name"
                key={"course.name"}
                render={(text, record) => {
                  return (
                    <Link
                      onClick={() => {
                        setVisibleVideo(true);
                        setSelectedCourse(record);
                      }}
                    >
                      {`${text}`}
                    </Link>
                  );
                }}
              ></Column>
              <Column title="Mô tả" dataIndex="Description"></Column>
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 10,
            }}
          >
            {idRequest ? (
              <Button
                style={{
                  marginRight: 5,
                  backgroundColor: "#1677ff",
                  color: "#FFF",
                }}
                ghost
                disabled={isCancel == true ? true : false}
                hidden={dataRequest?.Status == true ? true : false}
                onClick={() => acceptRequest(idRequest)}
              >
                Duyệt khóa học
              </Button>
            ) : null}
            {idRequest ? (
              <Button
                hidden={dataRequest?.Status == true ? true : false}
                disabled={isCancel == true ? true : false}
                ghost
                type="primary"
                onClick={() => denyRequest(idRequest)}
              >
                Từ chối
              </Button>
            ) : null}
          </div>
        </Col>
      </Modal>
      <VideoModal
        visible={visibleVideo}
        onClose={() => {
          setVisibleVideo(false);
          // window.location.reload(false);
        }}
        selectedOrder={selectedCourse}
      />
    </div>
  );
};
