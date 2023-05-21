import {
  BookOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Url } from "../../contexts/constants";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashBoardScreen() {
  const [totalCourse, setTotalCourse] = useState();
  const [totalOrder, setTotalOrder] = useState();
  const [totalVideo, setTotalVideo] = useState();
  const [totalStudent, setTotalStudent] = useState();
  const [totalTeacher, setTotalTeacher] = useState();
  const [dataUser, setDataUser] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  useEffect(() => {
    getCourse();
    getAllOrder();
    getAllVideo();
    getAllUser();
    getTotalStudent();
    getTotalTeacher();
  }, [totalCourse, totalOrder, totalStudent, totalTeacher, totalVideo]);
  const fetchData = async () => {
    try {
      getCourse();
      getAllOrder();
      getAllVideo();
      getAllUser();
    } catch (error) {}
  };
  const getAllUser = async () => {
    try {
      const res = await axios.get(`${Url}/api/user/getAll`);
      getTotalStudent(res.data);
      getTotalTeacher(res.data);
      setDataUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getTotalStudent = (data) => {
    const temp = dataUser.filter((item) => item?.IsTeacher === "STUDENT");
    console.log("totalStudent", temp.length);
    setTotalStudent(temp.length);
  };
  const getTotalTeacher = (data) => {
    const temp = dataUser.filter((item) => item?.IsTeacher !== "STUDENT");
    console.log("totalTeacher", temp.length);
    setTotalTeacher(temp.length);
  };
  const getAllVideo = async () => {
    try {
      const res = await axios.get(`${Url}/api/video/`);
      console.log("totalVideo", res.data.length);
      setTotalVideo(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };
  const getCourse = async () => {
    try {
      const res = await axios.get(`${Url}/api/course/`);
      // console.log(res.data);
      // setListCourse(res.data);
      console.log("totalCourse", res.data.length);
      setTotalCourse(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllOrder = async () => {
    try {
      const res = await axios.get(`${Url}/api/order`);
      // console.log(res.data);
      // setListCourse(res.data);
      console.log("totalOrder", res.data.length);
      setTotalOrder(res.data.length);
      setDataOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      style={{
        overflowY: "scroll",
        height: "calc(100vh - 90px)",
        width: "100vw",
      }}
    >
      <Space
        direction="vertical"
        style={{
          width: "80vw",
          alignItems: "center",
          justifyContent: "space-between",
          // backgroundColor: "yellow",
        }}
      >
        <div style={{ display: "flex" }}>
          <DashBoardCard
            icon={
              <BookOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgb(0,255,0,0.5)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Khóa học"}
            value={totalCourse}
          />
          <DashBoardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgb(0,255,0,0.5)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Đơn hàng"}
            value={totalOrder}
          />
          <DashBoardCard
            icon={
              <VideoCameraOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgb(0,255,0,0.5)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Video"}
            value={totalVideo}
          />

          <DashBoardCard
            icon={
              <UserOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgb(0,255,0,0.5)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Học viên"}
            value={totalStudent}
          />
          {/* <DashBoardCard
          icon={<ShoppingCartOutlined
            style={{
              color: "green",
              backgroundColor: "rgb(0,255,0,0.5)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8
            }}
          />} title={"Giảng viên"} value={totalTeacher} /> */}
        </div>
        <div
          style={{
            width: 1000,
            // display: "flex",
            justifyContent: "space-between",
            marginTop: 50,
          }}
        >
          <DashBoardChartUserPost user={dataUser} />
          <DashBoardChartUserPurchased user={dataUser} />
          <DashBoardChartOrderByUser order={dataOrder} />
        </div>
      </Space>
    </div>
  );
}
const DashBoardCard = ({ title, value, icon }) => {
  return (
    <Card style={{ marginLeft: 15, marginRight: 15 }}>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
};

function DashBoardChartUserPurchased({ user }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Biểu đồ số lượng khóa học đã mua",
        position: "top",
        font: {
          size: 20, // Kích thước font chữ của tiêu đề
          weight: "bold", // Độ đậm của font chữ của tiêu đề
          family: "Arial", // Font chữ của tiêu đề
        },
      },
    },
  };
  // const labels = ["thang 1", "thang 2", "thang 3", "thang 4", "thang 5"];
  const labels = user.map((e) => e?.Name);
  const data = user.map((e) => e?.CoursePurchased.length);
  const dataSourse = {
    labels,
    datasets: [
      {
        label: "Số lượng khóa học",
        data: data,
        backgroundColor: "red",
      },
    ],
  };
  return (
    <Bar
      style={{ marginTop: 10, marginBottom: 10 }}
      options={options}
      data={dataSourse}
    ></Bar>
  );
}
function DashBoardChartOrderByUser({ order }) {
  const getOrderListByBuyer = () => {
    const orderListByBuyer = order.reduce((acc, curr) => {
      const buyerId = curr?.Buyer?._id;
      if (buyerId) {
        if (!acc[buyerId]) {
          // Nếu chưa có danh sách đơn hàng của Buyer này, khởi tạo một mảng rỗng
          acc[buyerId] = [];
        }
        acc[buyerId].push(curr);
      }
      return acc;
    }, {});
    return orderListByBuyer;
  };

  const orderListByBuyer = getOrderListByBuyer();
  console.log("orderListByBuyer", orderListByBuyer);
}
function DashBoardChartUserPost({ user }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Biểu đồ số lượng khóa học đã đăng",
        position: "top",
        font: {
          size: 20, // Kích thước font chữ của tiêu đề
          weight: "bold", // Độ đậm của font chữ của tiêu đề
          family: "Arial", // Font chữ của tiêu đề
        },
      },
    },
  };
  // const labels = ["thang 1", "thang 2", "thang 3", "thang 4", "thang 5"];
  const labels = user.map((e) => e?.Name);
  const data = user.map((e) => e?.CoursePosted.length);
  const dataSourse = {
    labels,
    datasets: [
      {
        label: "Số lượng khóa học",
        data: data,
        backgroundColor: "red",
      },
    ],
  };
  return (
    <Bar
      style={{ marginTop: 10, marginBottom: 10 }}
      options={options}
      data={dataSourse}
    ></Bar>
  );
}
export default DashBoardScreen;
