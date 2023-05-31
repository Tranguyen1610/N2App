import { Button, Space, Spin, Table, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Url } from "../../contexts/constants";
import { ModalSettingFee } from "./components/ModalSettingFee";

const { Column } = Table;
const TeacherFee = () => {
  const [dataSource, setDateSource] = useState();
  const [visibleFee, setVisibleFee] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getSetting();
  }, [visibleFee]);
  const getSetting = async () => {
    const res = await axios.get(`${Url}/api/setting/find/Fee`);
    console.log("data setting", res.data);
    setDateSource(res.data);
    setLoading(false);
  };
  const closeModal = () => {
    setVisibleFee(false);
  };
  return (
    <div>
      <Spin spinning={loading}>
        <Table loading={loading} dataSource={[dataSource]}>
          <Column
            title="Loại"
            dataIndex="Name"
            key={"type.name"}
            render={(text, render) => {
              return (
                <Typography>
                  {text == "Fee" ? "Chi phí chiết khấu của giảng viên" : null}
                </Typography>
              );
            }}
          ></Column>
          <Column
            align="center"
            title="Giá trị (%)"
            dataIndex="Fee"
            render={(text, render) => {
              return <Typography>{text}</Typography>;
            }}
          ></Column>
          <Column
            title="Thao tác"
            dataIndex="Type"
            render={(render, text) => {
              return (
                <Space>
                  <Button
                    ghost
                    type="primary"
                    onClick={() => {
                      setVisibleFee(true);
                      // console.log("record", record);
                      // setSelectedCourse(record);
                      // setVisibleDetail(true);
                    }}
                  >
                    Cập nhật
                  </Button>
                </Space>
              );
            }}
          ></Column>
        </Table>
      </Spin>
      <ModalSettingFee
        visible={visibleFee}
        onClose={() => {
          setVisibleFee(false);
        }}
        handleClose={closeModal}
      />
    </div>
  );
};

export default TeacherFee;
