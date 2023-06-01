import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import { writeUserData, readUserData } from './../src/firebase/create'



const Login = () => {



  const onFinish = async (values: any) => {
    let { username, password } = values;

    let isThere = await readUserData({ username, password });

    if (isThere) {
      localStorage.setItem("test", "test");
      window.location.href = '/';
    }

    console.log('Success:', isThere);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      layout={"vertical"}
      style={{ maxWidth: 500, backgroundColor: "#121212ab", color: "white", padding: 20, borderRadius: 10 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h2>Login</h2>

      <Form.Item
        label={<span style={{ color: "white" }}>Username</span>}
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        style={{ color: "white !" }}

      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: "white" }}>Password</span>}
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          type="default"
          onClick={() => window.location.href = '/signup'}
        >
          Sign Up
        </Button>
        <Button 
          type="default" 
          htmlType="submit" 
          style={{ marginLeft: 15 }}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  )
};

export default Login;