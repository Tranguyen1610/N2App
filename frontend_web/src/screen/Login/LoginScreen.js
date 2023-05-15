import { Alert, Button, Divider, Form, Input, Typography } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
const LoginScreen = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const {login} = useContext(AuthContext);
  const [err,setErr] = useState("");
  const Login = async () => {
    const { email, password } = form.getFieldValue();
    try {
      const loginData = await login({
        Email:email,
        Password:password
      })
      if (!loginData.success) {
        // setAlert({ type: 'danger', message: loginData.message })
        // setTimeout(() => setAlert(null), 5000)
        // Alert('fkkffk');
        setErr(loginData.message)
        setTimeout(() => setErr(''), 3000)
      }
      else
      {
        setErr('');
        nav("/");
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f2f2f7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      className="login-page"
    >
      <Form className="loginForm" form={form} onFinish={Login}>
        <Typography.Title style={{textAlign:"center",fontWeight:"bold",color:"#4f4ae0", fontFamily:"sans-serif"}}>N2App</Typography.Title>
        <Form.Item
        style={{
          height:60,
          padding:10,
         
          
        }}
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter valid email",
            },
          ]}
          label={<span style={{fontWeight:"500",}}>Email</span>} name={"email"}>
          <Input style={{height:40}} placeholder="Nhập địa chỉ email" />
        </Form.Item>
        <Form.Item
         style={{
          height:60,
          padding:10,
          
        }}
          rules={[
            {
              required: true,
              message: "Please enter valid password",
            },
          ]}
          label={<span style={{fontWeight:"500",}}>Mật khẩu</span>} name={"password"}>
          <Input.Password
          style={{height:40}}
            placeholder="Nhập mật khẩu" />
        </Form.Item>
        <div
          style={{
            textAlign:'center',
            padding:5,
            color:'red'
          }}>{err}</div>
        <Button block style={{height:40,fontWeight:"bold"}} type="primary" htmlType="submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginScreen;
