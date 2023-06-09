import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Container,
  Col,
  Card,
  Button,
  Row,
} from "react-bootstrap";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Container className="w-100 mt-auto text-dark p-4">
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        <h4>&copy; {new Date().getFullYear()} - GAME ON</h4>
      </div>
    </Container>
  );
};

export default Footer;
