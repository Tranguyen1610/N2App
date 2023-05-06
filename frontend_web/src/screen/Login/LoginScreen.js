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
        <Typography.Title>N2App</Typography.Title>
        <Form.Item
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter valid email",
            },
          ]}
          label="Email" name={"email"}>
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter valid password",
            },
          ]}
          label="Password" name={"password"}>
          <Input.Password
            placeholder="Enter your passwrod" />
        </Form.Item>
        <div
          style={{
            textAlign:'center',
            padding:5,
            color:'red'
          }}>{err}</div>
        <Button block type="primary" htmlType="submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginScreen;
