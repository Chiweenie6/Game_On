import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

// import Ant Design
import { Form, Button, Alert } from "antd";

import Auth from "../utils/auth";

const Login = (props) => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  // Declare LOGIN_USER mutation
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  // Update state based on form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  // Submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    // Clear form values
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          🚫 Something went wrong with your login credentials! 🚫
        </Alert>
        <Form.Item>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Item
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form type="invalid">
            🚫 Email is required!
          </Form>
        </Form.Item>

        <Form.Item>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Item
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Item type="invalid">
          🚫 Password is required!
          </Form.Item>
        </Form.Item>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </>
  );
};

export default Login;
