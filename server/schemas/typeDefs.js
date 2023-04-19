const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    gameCount: Int
    savedGames: [Game]
    opinions: [String]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Opinion {
    _id: ID
    opinionText: String
    opinionAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Game {
    _id: ID
    title: String!
    image: String
    genre: String
    release: String
    players: String
    platform: String
    publisher: String
    description: String
  }

  input GameInput {
    _id: ID
    title: String!
    image: String
    genre: String
    release: String
    players: String
    platform: String
    publisher: String
    description: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput): User
    removeBook(bookId: String!): User
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
