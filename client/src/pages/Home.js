import React from "react";
import { useQuery } from "@apollo/client";

import {
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
  Row,
} from "react-bootstrap";

import Auth from "../utils/auth";
import { saveGameIds, getSavedGameIds } from "../utils/localStorage";

// Import SAVE_GAME mutation
import { SAVE_GAME } from "../utils/mutations";
import { useMutation } from "@apollo/client";



const Home = () => {

  return (
    <Container>
      <Row className="flex-row justify-center">
        <Col className="col-12 col-md-10 my-3">
          <h1>Let's Game</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
