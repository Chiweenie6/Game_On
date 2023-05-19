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

import { GameList } from "../components/GameList";
import { QUERY_GAMES } from "../utils/queries";

import Auth from "../utils/auth";
import { saveGameIds, getSavedGameIds } from "../utils/localStorage";

// Import SAVE_GAME mutation
import { SAVE_GAME } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const Home = () => {
  const { loading, data } = useQuery(QUERY_GAMES);
  const games = data?.games || [];

  return (
    <Container>
      <Row className="flex-row justify-center">
        <Col className="col-12 col-md-10 my-3">
          <h1>Let's Game</h1>
        </Col>
      </Row>

      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>🔃 Loading 🔃</div>
          ) : (
            <GameList games={games} title="Current list of games" />
          )}
        </div>
      </div>
    </Container>
  );
};

export default Home;
