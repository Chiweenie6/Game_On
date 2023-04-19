import React from "react";
import { useQuery } from "@apollo/client";

// import Ant Design
import {Layout, Space} from "antd";
const {Content} = Layout;



const Home = () => {

  return (
    <Space>
      <Layout className="flex-row justify-center">
        <Content className="col-12 col-md-10 my-3">
          <h1>HELLO</h1>
        </Content>
      </Layout>
    </Space>
  );
};

export default Home;
