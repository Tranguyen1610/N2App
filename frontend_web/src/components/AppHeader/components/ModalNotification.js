import { Button, Form, Input, Modal, Typography } from "antd"
import axios from "axios";


export const ModalNotification =({
    onClose,
    visible
})=>{
    const [form] = Form.useForm();

    const handlesPushNotification = async()=>{
        const {notification}=form.getFieldValue();
        const res = await axios.post("https://app.nativenotify.com/api/notification",
        {
            "appId": 7935,
            "appToken": "PWYYF7cD5ED659WILjyXpt",
            "title": "N2App",
            "body": notification
        })
        alert("gửi thành công")
        form.resetFields(["notification"])
    }
    return(
        <Modal
        okButtonProps={
            {hidden:true}
        }
        cancelButtonProps={{hidden:true}}
        open={visible}
        onCancel={onClose}
        style={{
            alignItems:"center",
            justifyContent:"center",
        }}
        width={500}
        >
        
        <Form style={{
            margin:10,
            marginTop:20,
            justifyContent:"center"
        }}  form={form} onFinish={handlesPushNotification}>
        <Typography.Title style={{textAlign:"center"}}>Tạo thông báo</Typography.Title>
        <Form.Item name={"notification"}>
          <Input placeholder="Enter notification" />
        </Form.Item>
        <div style={{textAlign:"right",justifyContent:"center"}}>
        <Button style={{width:"30%"}} type="primary" htmlType="submit">Gửi thông báo</Button>
        </div>
      </Form>
        
        </Modal>
    )
}