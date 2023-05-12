import { Col, Descriptions, Modal, Space } from "antd"
import { useEffect } from "react"


export const DrawMoneyModal = (
    {
    DrawVisible,
    onClose,
    selectedDraw,
    }
)=>{
    useEffect(()=>{
        console.log("Draw Modal",selectedDraw);
    },[])
    return(
        <div>
            <Modal
            open={DrawVisible}
            onCancel={onClose}
            cancelText="Thoát"
            title="Thông tin giao dịch"
            >
            <Space direction="vertical">
                <div style={{display:"flex"}}>
            <Descriptions column={1}>
                <Descriptions.Item label="Loại giao dịch">{selectedDraw?.Content?.Name}</Descriptions.Item>
                <Descriptions.Item label="Người thực hiện">{selectedDraw?.Sender?.Name}</Descriptions.Item>
                <Descriptions.Item label="Email">{selectedDraw?.Sender?.Email}</Descriptions.Item>
            </Descriptions>
            <Descriptions column={1}>
                <Descriptions.Item label="Số tiền rút">{selectedDraw?.Amount} đ</Descriptions.Item>
                <Descriptions.Item label="Số tiền trước khi rút">{selectedDraw?.Sender?.Balance} đ</Descriptions.Item>
                <Descriptions.Item label="Số tiền sau khi rút">{selectedDraw?.Sender?.Balance-selectedDraw?.Amount} đ</Descriptions.Item>
            </Descriptions>
            </div>
            </Space>
            </Modal>
        </div>
    )
}