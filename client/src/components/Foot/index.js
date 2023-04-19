import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// import Ant Design
import {Layout} from "antd";
const {Footer, Content} = Layout;

const Foot = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Footer className="w-100 mt-auto text-dark p-4">
      <Content className="container text-center mb-5">
        {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        <h4>&copy; {new Date().getFullYear()} - GAME ON</h4>
      </Content>
    </Footer>
  );
};

export default Foot;
