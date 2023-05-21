import { Button, Input, Space, Spin, Table, Typography } from "antd";
import Link from "antd/es/typography/Link";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { VideoModal } from "../Course/components/VideoModal";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Url } from "../../contexts/constants";

const { Column } = Table;
const VideoScreen = () => {
  const [dataSource, setDateSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [visible, setVisible] = useState(false);
  const [textSearch, setTextSearch] = useState("");

  const convert = (string) => {
    if (string != null) return string.toString().toLowerCase();
    else return "";
  };
  useEffect(() => {
    setLoading(true);
    getAllVideo();
  }, []);
  const getAllVideo = async () => {
    try {
      const res = await axios.get(`${Url}/api/video/`);
      console.log("video data", res.data);
      // setListCourse(res.data);
      setDateSource(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSearch = async (text) => {
    let list = [];
    // if (text) {

    // }
    // else getCourse()
    try {
      if (text) {
        dataSource.forEach((u) => {
          if (convert(u?.Name).includes(textSearch.toLocaleLowerCase())) {
            // if
            list.push(u);
          }
        });
        setDateSource(list);
      } else {
        getAllVideo();
        console.log("abc");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderVideoName = (text, record) => {
    const maxCharacters = 10; // Số ký tự tối đa muốn hiển thị
    if (text && text.length > maxCharacters) {
      const shortenedText = text.substring(0, maxCharacters) + "...";
      return (
        <Link
          onClick={() => {
            setVisible(true);
            setSelectedCourse(record);
          }}
        >
          {shortenedText}
        </Link>
      );
    }
    return (
      <Link
        onClick={() => {
          setVisible(true);
          setSelectedCourse(record);
        }}
      >
        {text}
      </Link>
    );
  };

  return (
    <div>
      <Space style={{ marginBottom: 10 }}>
        <div style={{ display: "flex" }}>
          <Button
            onClick={() => {
              handleSearch(textSearch);
              console.log("12456", textSearch);
            }}
            type="primary"
            icon={<SearchOutlined />}
          >
            Tìm kiếm
          </Button>
          <Input
            style={{ marginLeft: 5 }}
            placeholder="Nhập tên khóa học"
            name="searchCourse"
            onChange={(e) => {
              setTextSearch(e.target.value);
            }}
          ></Input>
        </div>
      </Space>
      <Spin spinning={loading}>
        <Table
          dataSource={dataSource}
          loading={loading}
          pagination={{
            pageSize: 5,
          }}
        >
          <Column
            title="Tên Khóa học"
            dataIndex=""
            key={"course.name"}
            render={(text, record) => {
              return <span>{record?.CourseId?.Name}</span>;
            }}
          ></Column>
          <Column
            width={70}
            title="Tên Video"
            dataIndex="Name"
            key={"video.name"}
            render={renderVideoName}
            // render={(text, record) => {
            //   const maxCharacters = 50; // Số ký tự tối đa muốn hiển thị

            //   return (
            //     <Link
            //       onClick={() => {
            //         setVisible(true);
            //         setSelectedCourse(record);
            //         console.log("link video", record);
            //       }}
            //     >
            //       {/* {`${text}`} */}
            //       {
            //         shortenedText
            //       }
            //     </Link>
            //   );
            // }}
          ></Column>
          <Column align="center" title="Mô tả" dataIndex="Description"></Column>
          <Column
            title="Loại"
            dataIndex=""
            render={(text, record) => {
              return <span>{record?.CourseId?.Type}</span>;
            }}
          ></Column>
          {/* <Column
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
          ></Column> */}
        </Table>
      </Spin>
      <VideoModal
        visible={visible}
        onClose={() => {
          setVisible(false);
          // window.location.reload(false);
        }}
        selectedOrder={selectedCourse}
      />
    </div>
  );
};

export default VideoScreen;
