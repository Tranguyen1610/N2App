import { Button, Form, Input, message, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { AppleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

const LoginScreen = () => {

  


  return (
    <div style={{
    minHeight:"100vh",
    background:"#f2f2f7",
    display:"flex",
    justifyContent:"center"
    }} className="login-page">
      <div style={{ paddingTop: 120 }}>
        <div
        style={{
          width:"450px",
          padding:"24px 40px",
          backgroundColor:"#FFF",
          borderRadius:"5px"
        }}
        className="login-container">
          <div className="logo text-center">
            {/* <span style={{ fontSize: 22 }}>
              <img
                src={logo}
                width={120}
                style={{ borderRadius: 5, marginBottom: "1.5em" }}
                alt=""
              />
            </span> */}
          </div>

          <Form  layout={"vertical"}>
            <FormItem label="Username" name="username">
              <Input prefix={<UserOutlined />} size="large" />
            </FormItem>

            <FormItem label="Password" name="password">
              <Input.Password prefix={<LockOutlined />} size="large" />
            </FormItem>

            <FormItem>
              <Button
                htmlType="submit"
                style={{ width: "100%" }}
                // loading={loading}
                type="primary"
                size="large"
              >
                Login
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen