import React, { useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import "./auth.css";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    console.log("Login values:", values);
    setLoading(true);

    try {
      const response = await fetch(
        "https://brewerybe-production.up.railway.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();
      localStorage.setItem("user", JSON.stringify(result.userDetails));

      if (response.ok) {
        console.log("Login successful");
        message.success("Logged in successfully");
        login();
        navigate("/home");
      } else {
        message.error("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Spin spinning={loading} size="large">
        <Form
          name="login"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default Login;
