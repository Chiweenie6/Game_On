import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

// import Ant Design
import { Form, Button, Alert, Input } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import Auth from "../utils/auth";

const Signup = () => {
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Declared addUser using "ADD_USER mutation"
  const [addUser, { error }] = useMutation(ADD_USER);

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // update state based on form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addProfile.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}

      <Form
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
        name="normal_login"
        className="login-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleFormSubmit}
        autoComplete="off"
      >
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          🚫 Something went wrong with your signup! 🚫
        </Alert>

        <Form.Item
          type="text"
          name="username"
          required
          label="Username"
          rules={[{ required: true, message: "🚫 Username is required!" }]}
        >
          <Input 
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Your username"
          value={userFormData.username}
          onChange={handleInputChange} />
        </Form.Item>

        <Form.Item
          type="email"
          name="email"
          required
          label="Email"
          rules={[{ required: true, message: "🚫 Email is required!" }]}
        >
          <Input 
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Your email address"
          value={userFormData.email}
          onChange={handleInputChange} />
        </Form.Item>

        <Form.Item
          type="password"
          name="password"
          required
          label="Password"
          rules={[{ required: true, message: "🚫 Password is required!" }]}
        >
          <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Your password"
          value={userFormData.password}
          onChange={handleInputChange} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit" type="primary" className="login-form-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Signup;
