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
import { ConfigProvider, theme } from "antd";

import LoginForm from "./pages/LoginForm";




import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

import Header from "./components/Header";
import Footer from "./components/Footer";

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
        algorithm: theme.darkAlgorithm,
      }}
    >
      <ApolloProvider client={client}>
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/me" element={<Profile />} />
                <Route path="/profiles/:profileId" element={<Profile />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    </ConfigProvider>
  );
}

export default App;
