import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import { writeUserData, readUserData } from './../src/firebase/create'



const Registration = () => {
  


  const onFinish = async (values: any) => {
    let { username, password, email } = values;
    await writeUserData({name: username, password, email});
    window.location.href = '/login';
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
      <h2>Sign Up</h2>

      <Form.Item
        label={<span style={{ color: "white" }}>Username</span>}
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: "white" }}>Email</span>}
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: "white" }}>Password</span>}
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password  />
      </Form.Item>

      <Form.Item>
        <Button 
            type="default" 
            htmlType="submit"
        >
            Sign Up
        </Button>
        <Button 
            type="default" 
            style={{ marginLeft: 15 }}
            onClick={() => window.location.href = '/login'}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  )
};

export default Registration;