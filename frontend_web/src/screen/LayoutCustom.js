import { Space } from "antd";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import SideMenu from "../components/SideMenu";
import CourseScreen from "./Course/CourseScreen";
import DashBoardScreen from "./DashBoard/DashBoardScreen";
import OrderScreen from "./Order/OrderScreen";
import TeacherScreen from "./Teacher/TeacherScreen";
import StudentScreen from "./Student/StudentScreen";
import VideoScreen from "./Video/VideoScreen";
import TeacherFee from "./Setting/TeacherFee";

export default function LayoutCustom({ name }) {
  return (
    <div className="Main">
      <AppHeader />
      <Space style={{ width: "100%" }} className="SideMenuAndPageContent">
        {/* phải verhical mới width 100% */}
        <SideMenu />
        <div className="PageContent">
          {name === "Course" ? (
            <CourseScreen />
          ) : name === "DashBoard" ? (
            <DashBoardScreen />
          ) : name === "Order" ? (
            <OrderScreen />
          ) : name === "Teacher" ? (
            <TeacherScreen />
          ) : name === "Student" ? (
            <StudentScreen />
          ) : name === "Video" ? (
            <VideoScreen />
          ) : name === "TeacherFee" ? (
            <TeacherFee />
          ) : (
            <></>
          )}
        </div>
      </Space>
      <AppFooter />
    </div>
  );
}
