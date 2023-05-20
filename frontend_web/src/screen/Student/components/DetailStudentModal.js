import {
  Avatar,
  Col,
  Descriptions,
  Image,
  Modal,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import Link from "antd/es/typography/Link";
import { DetailCourseModal } from "../../Course/components/DetailCourseModal";
import axios from "axios";
import { Url } from "../../../contexts/constants";

const { Column } = Table;

export const DetailStudentModal = ({
  selectedUser,
  visible,
  onClose,
  onSubmitOk,
}) => {
  const [visibleCourse, setVisibleCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [dataSource, setDateSource] = useState([]);
  useEffect(() => {
    console.log("dataUSer:", selectedUser);
  });
  const getCourseById = async (id) => {
    try {
      const res = await axios.get(`${Url}/api/course/getInfoCourse/${id}`);
      console.log("getCourseById", res.data);
      // setListCourse(res.data);
      setDateSource(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal
        onCancel={onClose}
        open={visible}
        style={{ top: 20 }}
        width={1000}
        title="Thông tin người dùng"
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <Col span={12}>
            <Descriptions column={1} contentStyle={{ fontWeight: "bold" }}>
              <Descriptions.Item label="Mã học viên">
                <span>{selectedUser?._id}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <span>{selectedUser?.Email}</span>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col>
            <Descriptions column={1} contentStyle={{ fontWeight: "bold" }}>
              <Descriptions.Item label="Họ và tên">
                <span>{selectedUser?.Name}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Chức vụ">
                <span style={{ color: "red" }}>
                  {selectedUser?.IsTeacher == "STUDENT"
                    ? "Học viên"
                    : "Giảng viên"}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </div>

        <Space direction="vertical">
          <Typography.Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Danh sách khóa học đã mua
          </Typography.Text>
        </Space>
        <Spin spinning={false}>
          <Table
            pagination={{
              pageSize: 5,
            }}
            dataSource={selectedUser?.CoursePurchased}
            // loading={loading}
          >
            <Column
              title="Tên khóa học"
              dataIndex="Name"
              key={"course.name"}
              render={(text, record) => {
                return (
                  <Link
                    onClick={() => {
                      setVisibleCourse(true);
                      setSelectedCourse(getCourseById(record._id));
                    }}
                  >
                    {`${text}`}
                  </Link>
                );
              }}
            ></Column>
            <Column title="Giá" dataIndex="Price"></Column>
            <Column title="Mô tả" dataIndex="Description"></Column>
          </Table>
        </Spin>

        <Col>
          <Space direction="vertical">
            <Typography.Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Danh sách khóa học đã tạo
            </Typography.Text>
          </Space>
          <Spin spinning={false}>
            <Table
              pagination={{ pageSize: 5 }}
              dataSource={selectedUser?.CoursePosted}
              // loading={loading}
            >
              <Column
                title="Tên khóa học"
                dataIndex="Name"
                key={"course.name"}
                render={(text, record) => {
                  return (
                    <Link
                      onClick={() => {
                        setVisibleCourse(true);
                        setSelectedCourse(getCourseById(record._id));
                      }}
                    >
                      {`${text}`}
                    </Link>
                  );
                }}
              ></Column>
              <Column title="Giá" dataIndex="Price"></Column>
              <Column title="Mô tả" dataIndex="Description"></Column>
            </Table>
          </Spin>
        </Col>
        <Col>
          <Space direction="vertical">
            <Typography.Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Danh sách khóa học mong ước
            </Typography.Text>
          </Space>
          <Spin spinning={false}>
            <Table
              pagination={{ pageSize: 5 }}
              dataSource={selectedUser?.WishList}
              // loading={loading}
            >
              <Column
                title="Tên khóa học"
                dataIndex="Name"
                key={"course.name"}
                render={(text, record) => {
                  return (
                    <Link
                      onClick={() => {
                        setVisibleCourse(true);
                        setSelectedCourse(getCourseById(record._id));
                      }}
                    >
                      {`${text}`}
                    </Link>
                  );
                }}
              ></Column>
              <Column title="Giá" dataIndex="Price"></Column>
              <Column title="Mô tả" dataIndex="Description"></Column>
            </Table>
          </Spin>
        </Col>
      </Modal>
      <DetailCourseModal
        visible={visibleCourse}
        onClose={() => {
          setVisibleCourse(false);
        }}
        selectedOrder={dataSource}
      />
    </div>
  );
};
