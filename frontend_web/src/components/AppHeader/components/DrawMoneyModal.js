import { Modal } from "antd"
import { useEffect } from "react"


export const DrawMoneyModal = (
    {
    DrawVisible,
    onClose,
    selectedDraw,
    }
)=>{
    useEffect(()=>{
        console.log(selectedDraw);
    })
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