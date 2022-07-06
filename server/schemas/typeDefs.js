const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
    followCount: Int
    followerCount: Int
    posts: [Post]
    following: [User]
    followers: [User]
  }

  type Post {
    _id: ID
    imagekitId: String
    createdAt: String
    username: String
    replycount: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    username: String
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      username: String!
      name: String!
      email: String!
      password: String!
    ): Auth
    updateUser(name: String!): User
    addPost(imagekitId: ID!, username: String!): User
    addComment(commentText: String!, username: String!): Comment
    removePost(_id: ID!): User
  }
`;

module.exports = typeDefs;
