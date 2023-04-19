import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Ant Design
import "antd/dist/reset.css";
import "./App.css";
import { ConfigProvider, theme, Header, Footer, Layout } from "antd";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";




import Home from "./pages/Home";
import Head from "./components/Head";
import Foot from "./components/Foot";

// Creates GraphQL API server endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Attaches the JWT token as an "authorization" header to every request
const authLink = setContext((_, { headers }) => {
  // Find authentication token from local storage
  const token = localStorage.getItem("id_token");
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.lightAlgorithm,
      }}
    >
      <ApolloProvider client={client}>
        <Router>
          <Layout>
          <div className="flex-column justify-flex-start min-100-vh">
            <Head />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/me" element={<Profile />} />
                <Route path="/profiles/:profileId" element={<Profile />} />
              </Routes>
            </div>
            <Foot />
          </div>
          </Layout>
        </Router>
      </ApolloProvider>
    </ConfigProvider>
  );
}

export default App;
