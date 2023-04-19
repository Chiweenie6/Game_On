import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_Opinion = gql`
  mutation addOpinion($opinionText: String!) {
    addOpinion(opinionText: $opinionText) {
      _id
      opinionText
      opinionAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const REMOVE_Opinion = gql`
  mutation removeOpinion($opinionId: String!) {
    removeOpinion(opinionId: $opinionId) {
      _id
      opinionText
      opinionAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation removeComment($opinionId: ID!, $commentId: String!) {
    removeComment(opinionId: $opinionId, commentId: $commentId) {
      _id
      opinionText
      opinionAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation addComment($opinionId: ID!, $commentText: String!) {
    addComment(opinionId: $opinionId, commentText: $commentText) {
      _id
      opinionText
      opinionAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const SAVE_GAME = gql`
  mutation saveGame($input: GameInput) {
    saveGame(input: $input) {
      _id
      username
      email
      gameCount
      savedGames {
        _id
        title
        image
        genre
        release
        players
        platform
        publisher
        description
      }
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($gameId: String!) {
    removeGame(gameId: $gameId) {
      _id
      username
      email
      gameCount
      savedGames {
        _id
        title
        image
        genre
        release
        players
        platform
        publisher
        description
      }
    }
  }
`;