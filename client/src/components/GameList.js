import React from "react";
import { Link } from "react-router-dom";

import {Card} from "react-bootstrap";

const GameList = ({ games, title }) => {
  if (!games.length) {
    return <h4>No Games At The Moment</h4>;
  }


return (
  <div>
    <h2 className="text-info">{title}</h2>

    <div className="flex-row justify-space-between my-4">
        {games && games.map((game) => (
            <div key={game._id} className=" col-12">
            <Card>
                <h2 className="card-header bg-dark text-light p-2 m-0">{game.title}</h2>
                <br></br>
                <h4>{game.image}</h4>
                <br></br>
                <h4>{game.genre}</h4>
                <br></br>
                <h4>{game.release}</h4>
                <br></br>
                <h4>{game.players}</h4>
                <br></br>
                <h4>{game.platform}</h4>
                <br></br>
                <h4>{game.publisher}</h4>
                <br></br>
                <p>{game.description}</p>
                <br></br>
            </Card>

            <Link
            className="btn btn-block btn-squared btn-light text-dark"
            to={`/games/${game._id}`}
            >
                View Game
            </Link>
            </div>
        ))}
    </div>
  </div>
);
    };

export default GameList;