import { Button, Col, Descriptions, Modal, Space } from "antd";
import { useEffect } from "react";
import { formatMoney } from "../../../utils/format";

export const DrawMoneyModal = ({
  bankAccount,
  accept,
  deny,
  DrawVisible,
  onClose,
  selectedDraw,
}) => {
  useEffect(() => {
    console.log("Draw Modal", selectedDraw);
  }, []);
  return (
    <div>
      <Modal
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        open={DrawVisible}
        onCancel={onClose}
        cancelText="Thoát"
        title="Thông tin giao dịch"
      >
        <Space direction="vertical">
          <div style={{ display: "flex" }}>
            <Descriptions column={1}>
              <Descriptions.Item label="Loại giao dịch">
                {selectedDraw?.Content?.Name}
              </Descriptions.Item>
              <Descriptions.Item label="Người thực hiện">
                {selectedDraw?.Sender?.Name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedDraw?.Sender?.Email}
              </Descriptions.Item>
              <Descriptions.Item label="Ngân hàng">
                {bankAccount?.BankName}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions column={1}>
              <Descriptions.Item label="Số tiền rút">
                {formatMoney(selectedDraw?.Amount)} đ
              </Descriptions.Item>
              <Descriptions.Item label="Số tiền trước khi rút">
                {formatMoney(selectedDraw?.Sender?.Balance)} đ
              </Descriptions.Item>
              <Descriptions.Item label="Số tiền sau khi rút">
                {formatMoney(
                  selectedDraw?.Sender?.Balance - selectedDraw?.Amount
                )}{" "}
                đ
              </Descriptions.Item>
              <Descriptions.Item label="Số tài khoản">
                {bankAccount?.BankNumber}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              hidden={selectedDraw?.IsCancel == true ? true : false}
              disabled={selectedDraw?.Status == true ? true : false}
              ghost
              style={{
                marginRight: 5,
                backgroundColor: "#1677ff",
                color: "#FFF",
              }}
              onClick={() => {
                //   acceptRequest(item?._id)
                accept(selectedDraw?._id);
              }}
            >
              Duyệt
            </Button>
            <Button
              hidden={selectedDraw?.IsCancel == true ? true : false}
              disabled={selectedDraw?.Status == true ? true : false}
              style={{ paddingLeft: 5, paddingRight: 5 }}
              ghost
              type="primary"
              onClick={() => {
                //   denyRequest(item?._id)
                deny(selectedDraw?._id);
              }}
            >
              Từ chối
            </Button>
          </div>
        </Space>
      </Modal>
    </div>
  );
};
