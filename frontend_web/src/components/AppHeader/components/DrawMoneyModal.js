import { Modal } from "antd"


export const DrawMoneyModal = (
    {
    DrawVisible,
    onClose,
    selectedDraw,
    }
)=>{
    return(
        <div>
            <Modal
            open={DrawVisible}
            onCancel={onClose}
            cancelText="Thoát"
            title="Thông tin giao dịch"
            >

            </Modal>
        </div>
    )
}