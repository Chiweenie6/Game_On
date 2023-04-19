import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

// import Ant Design
import { Form, Button, Alert, Input, Space } from "antd";

import Auth from "../utils/auth";
import FormItem from "antd/es/form/FormItem";

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
      <Space noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          🚫 Something went wrong with your signup! 🚫
        </Alert>

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleInputChange}
          autoComplete="off"
        >
          <Form.Item
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            label="Username"
            rules={[{ required: true, message: "🚫 Username is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
            label="Email"
            rules={[{ required: true, message: "🚫 Email is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
            label="Password"
            rules={[{ required: true, message: "🚫 Password is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              htmlType="submit"
              type="primary"
              disabled={
                !(
                  userFormData.username &&
                  userFormData.email &&
                  userFormData.password
                )
              }
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </>
  );
};

export default Signup;
