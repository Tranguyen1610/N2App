import { Button, Input, Space, Spin, Table, Typography } from "antd";
import React, { useEffect } from "react";
import { Url } from "../../contexts/constants";
import axios from "axios";
import { useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { CourseModal } from "./components/CourseModal";
import { DetailCourseModal } from "./components/DetailCourseModal";
import { VideoModal } from "./components/VideoModal";
const { Column } = Table;
function CourseScreen() {
  const [dataSource, setDateSource] = useState([]);
  const [star, setStar] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [visible, setVisible] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  useEffect(() => {
    setLoading(true);
    getCourse();
    handleGetNumberStar();
  }, []);
  const convert = (string) => {
    if (string != null) return string.toString().toLowerCase();
    else return "";
  };
  const getCourse = async () => {
    try {
      const res = await axios.get(`${Url}/api/course/`);
      // console.log(res.data);
      // setListCourse(res.data);
      setDateSource(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSearch = async (text) => {
     let list = []
    // if (text) {
     
    // }
    // else getCourse()
    try {
      if (text) {
        dataSource.forEach((u) => {
          if (convert(u?.Name).includes(text.toLocaleLowerCase())) {
            // if
            list.push(u)
          }
        });
        console.log("list",list);
        setDateSource(list)
      } else {
        getCourse();
        console.log("abc");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleGetNumberStar = () => {
    console.log("dataStar", dataSource);
  };
  const getStartOfCourse = async (id) => {
    try {
      const res = await axios.get(`/api/comment/${id}`);
      console.log("star", res.data);
      setStar(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{}}>
      <Space style={{marginBottom:10}}>
        <div style={{ display: "flex" }}>
          <Button
            onClick={() => {
              handleSearch(textSearch);
              console.log("12456",textSearch);
            }}
            type="primary"
            icon={<SearchOutlined />}
          >
            Tìm kiếm
          </Button>
          <Input
            style={{marginLeft:5}}
            placeholder="Nhập tên khóa học"
            name="searchCourse"
            onChange={e => {setTextSearch(e.target.value);
            }}
          ></Input>
        </div>
      </Space>
      <Spin spinning={loading}>
        <Table dataSource={dataSource} loading={loading} pagination={{pageSize:6}}>
          <Column
            title="Tên Khóa học"
            dataIndex="Name"
            key={"course.name"}
          ></Column>
          <Column title="Giá" dataIndex="Price"></Column>
          <Column
            title="Loại"
            dataIndex=""
            render={(text, record) => <span>{record.Type?.Name}</span>}
          ></Column>
          {/* <Column
            title="Đánh giá"
            dataIndex=""
            render={(text, record) => {
              //  getStartOfCourse(record._id)
            }}
          ></Column> */}
          {/* <Column
          title="Nổi bật"
          dataIndex="isHighlight"
          ></Column>
          <Column
          title="Trạng thái"
          dataIndex="isActive"
          ></Column> */}
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
                    console.log("record", record);
                    setSelectedCourse(record);
                    setVisibleDetail(true);
                  }}
                >
                  Chi tiết
                </Button>
              </Space>
            )}
          />
        </Table>
      </Spin>
      <CourseModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
      <DetailCourseModal
        visible={visibleDetail}
        onClose={() => {
          setVisibleDetail(false);
        }}
        selectedOrder={selectedCourse}
      />
    </div>
  );
}

export default CourseScreen;
