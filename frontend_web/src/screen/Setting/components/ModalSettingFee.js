import { Button, Form, Input, Modal, Typography } from "antd";
import axios from "axios";
import { Url } from "../../../contexts/constants";

export const ModalSettingFee = ({ onClose, visible, handleClose }) => {
  const [form] = Form.useForm();
  const handleSetting = async () => {
    const { fee, Namefee } = form.getFieldValue();
    console.log("NameFee", Namefee);
    console.log("Fee", fee);

    const res = await axios.put(`${Url}/api/setting`, {
      Name: "Fee",
      Fee: fee,
    });

    console.log("data put", res.data);
    alert("Thành công");
    form.resetFields(["fee"]);
    handleClose();
  };

  return (
    <Modal
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      open={visible}
      onCancel={onClose}
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
      width={500}
    >
      <Form
        style={{
          margin: 10,
          marginTop: 20,
          justifyContent: "center",
        }}
        form={form}
        onFinish={() => {
          handleSetting();
        }}
      >
        <Typography.Title style={{ textAlign: "center" }}>
          Cấu hình
        </Typography.Title>
        <Form.Item name={"Namefee"} initialValue={"Chiết khấu"}>
          <Input value={"Fee"} placeholder="Chiết khấu" disabled />
        </Form.Item>
        <Form.Item name={"fee"}>
          <Input placeholder="Nhập chiết khẩu" />
        </Form.Item>
        <div style={{ textAlign: "right", justifyContent: "center" }}>
          <Button style={{ width: "30%" }} type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
