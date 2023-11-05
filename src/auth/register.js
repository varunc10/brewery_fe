import React, { useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import "./auth.css";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Form values:", values);
    setLoading(true);
    try {
      const response = await fetch(
        "https://brewerybe-production.up.railway.app/register",
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
        console.log("Registration successful");
        login();
        message.success("User is Registered");
        navigate("/home");
      } else if (response.status === 400) {
        message.error("Username is already registered");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h4 style={{display: 'flex', justifyContent: 'center'}}>Choose any username and password</h4>
      <Spin spinning={loading} size="large">
        <Form
          name="registration"
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

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
            <Button
              type="primary"
              wrapperCol={{ offset: 8, span: 10 }}
              onClick={() => navigate("/login")}
            >
              Existing User Login
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default Register;
