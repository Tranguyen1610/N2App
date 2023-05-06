import { AppleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Typography } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";
import ScreenRoutes from "../../navigations/ScreenRoutes";
const { Item: FormItem } = Form;
const LoginScreen = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassWord] = useState("");
  const [alert, setAlert] = useState('')
  const [form]=Form.useForm();
  // const { login, loadUser, userInfo } = useContext(AuthContext)
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const navigate  =useNavigate()
  const Login = async () => {
    const {email,password}= form.getFieldValue();
          try {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
     
            if (reg.test(email) === false) {
              setAlert("Định dạng email không đúng")
              // ref_inputEmail.current.focus()
              setTimeout(() => setAlert(''), 5000)
            }
            const res = await axios.post('/api/user/login',{
              Email:email,
              Password:password
            })
            if (!res) {
              setAlert(res.message)
              setIsLoginSuccess(false)
              setTimeout(() => setAlert(''), 5000)
            }
            else {
              console.log("Thanh Cong");
              setAlert("Đăng nhập thành công")
              setIsLoginSuccess(true)
              navigate("/");

              // setTimeout(() => {
              //   setAlert("")
              //   if (loginData.IsVerified)
              //     loadUser();
              //   else
              //   setIsLoginSuccess(false);
              // }, 1000)
            }
    }finally{

    }
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f2f2f7",
        display: "flex",
        justifyContent: "center",
        alignItems:"center"
      }}
      className="login-page"
    >
            <Form className="loginForm" form={form} onFinish={Login}>
              <Typography.Title>N2App</Typography.Title>
              <Form.Item
              rules={[
                {
                  required:true,
                  type:"email",
                  message:"Please enter valid email",
                },
              ]}
              label="Email" name={"email"}>
                <Input placeholder="Enter your email"/>
              </Form.Item>
              <Form.Item
               rules={[
                {
                  required:true,
                  message:"Please enter valid password",
                },
              ]}
              label="Password" name={"password"}>
                <Input.Password
                placeholder="Enter your passwrod"/>
              </Form.Item>
              <Button block type="primary" htmlType="submit">Login</Button>
            </Form>
    </div>
  );
};

export default LoginScreen;
