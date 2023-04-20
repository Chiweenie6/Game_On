import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_GAME } from "../utils/mutations";

import Auth from "../utils/auth";
import { removeGameId } from "../utils/localStorage";

import OpinionForm from "../components/OpinionForm";
import OpinionList from "../components/OpinionList";

import {
  Container,
  Col,
  Card,
  Button,
  Row,
} from "react-bootstrap";



const Profile = () => {
  const { username: userParam } = useParams();
  // Use the Query "GET_ME"
  const { loading, data } = useQuery(QUERY_ME);
  // Checks if data is returning from "GET_ME" and saves to "userData"
  let userData = data?.me || {};

  const [removeGame] = useMutation(REMOVE_GAME);

  // create function that accepts the game's mongo _id value as param and deletes the game from the database
  const handleDeleteGame = async (gameId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { newData } = await removeGame({
        variables: {
          gameId: gameId,
        },
      });

      if (!newData.ok) {
        throw new Error("🚫 Something went wrong! 🚫");
      }

      // Update user's savedGames after removing game.
      userData = newData;

      // upon success, remove game's id from localStorage
      removeGameId(gameId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>🔃 Loading 🔃</div>;
  }
  if (!userData?.username) {
    return <h2>🚫 Must Be Logged In To View Profile🚫</h2>;
  }

  return (
    <>
      <Container
        fluid
        className="text-light bg-dark p-5"
        class="text-center p-5 text-success"
      >
        <div class="">
          <h1>🕹️ Saved Games 🎮</h1>
        </div>
      </Container>
      <Container>
        <h2 class="text-center">
          {userData.savedGames.length
            ? `${userData.savedGames.length} saved ${
                userData.savedGames.length === 1 ? "game" : "games"
              }:`
            : "No saved games!"}
        </h2>
        <Container>
          <Row>
            <Col>
              {userData.savedGames.map((game) => {
                return (
                  <Card key={game.gameId} border="dark">
                    {game.image ? (
                      <Card.Img
                        src={game.image}
                        alt={`The cover for ${game.title}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{game.title}</Card.Title>
                      <p className="small">Genre: {game.genre}</p>
                      <p className="small">Release: {game.release}</p>
                      <p className="small">Players: {game.players}</p>
                      <p className="small">Platform: {game.platform}</p>
                      <p className="small">Publisher: {game.publisher}</p>
                      <Card.Text>{game.description}</Card.Text>
                      
                      <br></br>
                      <br></br>
                      <br></br>
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeleteGame(game.gameId)}
                      >
                        🔥 Delete this Game!
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </Col>
          </Row>
        </Container>
        <Container>
          <div className="flex-row justify-center mb-3">
            <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
              Viewing {userParam ? `${userData.username}'s` : "your"} profile.
            </h2>

            <div className="col-12 col-md-10 mb-5">
              <OpinionList
                opinions={userData.opinions}
                title={`${userData.username}'s opinions...`}
                showTitle={false}
                showUsername={false}
              />
            </div>
            {!userParam && (
              <div
                className="col-12 col-md-10 mb-3 p-3"
                style={{ border: "1px dotted #1a1a1a" }}
              >
                <OpinionForm />
              </div>
            )}
          </div>
        </Container>
      </Container>
    </>
  );
};

export default Profile;
