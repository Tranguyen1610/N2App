import { Col, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  InputNumber,
  InputNumber as InputNumber2,
} from "../../../components/Input/InputNumber";
import { Url } from "../../../contexts/constants";
export const CourseModal = ({
  selectedOrder,
  visible,
  onClose,
  onSubmitOk,
}) => {
  const [dataType, setDataType] = useState([]);
  const [formNameType, setFormNameType] = useState();
  useEffect(() => {
    getAllType();
  }, [visible]);
  const getAllType = async () => {
    try {
      const res = await axios(`${Url}/api/type`);
      setDataType(res.data);
      console.log("type", res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal
      onCancel={onClose}
      open={visible}
      title={<>Thêm Khóa Học</>}
      style={{ top: 20 }}
      width={1000}
      afterClose={() => {
        setFormNameType(null);
      }}
    >
      <Form>
        <div style={{ display: "flex" }}>
          <Col style={{ marginRight: 5 }}>
            <Form.Item label="Tên khóa học">
              <Input placeholder="Tên khóa học" />
            </Form.Item>
            <Form.Item label="Mô tả">
              <TextArea placeholder="" rows={3} />
            </Form.Item>
            <Form.Item label="Loại">
              <Select
                onChange={(value) => {
                  setFormNameType(value);
                }}
                placeholder={"Thể loại"}
              >
                {dataType?.map((item, index) => (
                  <Select.Option key={index} value={item?.Name}></Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Giá tiền">
              {/* <InputNumber2 style={{ width: "100%" }} addonAfter={"VNĐ"} /> */}
              <Input placeholder="Giá"/>
            </Form.Item>
          </Col>
          <Form.Item label="Name">
            <Input placeholder="Tên khóa học" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
