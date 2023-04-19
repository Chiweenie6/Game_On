import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
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
      opinions {
        _id
        opinionText
        opinionAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_OPINIONS = gql`
  query getOpinions {
    opinions {
      _id
      opinionText
      opinionAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_OPINION = gql`
  query getSingleOpinion($opinionId: ID!) {
    opinion(opinionId: $opinionId) {
      _id
      opinionText
      opinionAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;