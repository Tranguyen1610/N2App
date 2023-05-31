import {
  AppstoreOutlined,
  DollarCircleOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { useNavigate } from "react-router-dom";

function SideMenu() {
  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Sider width={200}>
        <Menu
          mode="inline"
          className="Menu"
          onClick={(item) => {
            //item,key
            navigate(item.key);
          }}
          items={[
            {
              label: "DashBoard",
              icon: <AppstoreOutlined />,
              key: "/",
            },
            {
              label: "Khóa học",
              key: "/Course",
              icon: <ShopOutlined />,
            },
            {
              label: "Hóa đơn",
              key: "/Order",
              icon: <ShopOutlined />,
            },
            {
              label: "Video",
              key: "/Video",
              icon: <AppstoreOutlined />,
            },
            {
              label: "Người dùng",
              key: "/Student",
              icon: <AppstoreOutlined />,
            },
            {
              label: "Cấu hình",
              style: { color: "#FFFF" },
              key: "/Setting",
              icon: <AppstoreOutlined />,
              children: [
                {
                  label: "Chiết khấu",
                  key: "/TeacherFee",
                  icon: <DollarCircleOutlined />,
                },
              ],
            },
          ]}
        ></Menu>
      </Sider>
    </div>
  );
}

export default SideMenu;
