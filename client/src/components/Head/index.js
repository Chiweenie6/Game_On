import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

// import Ant Design
import {Layout, Button} from "antd";

const {Header, Content} = Layout;

const Head = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Header className="bg-info text-dark mb-4 py-3 display-flex align-center">
      <Layout className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-dark" to="/">
          <h1 className="m-0" style={{ fontSize: "3rem" }}>
            Game On
          </h1>
        </Link>
        <p className="m-0" style={{ fontSize: "1.75rem", fontWeight: "700" }}>
          Let's Play A Game.
        </p>
        <Content>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/me">
                My Profile
              </Link>
              <Button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </Content>
      </Layout>
    </Header>
  );
};

export default Head;
