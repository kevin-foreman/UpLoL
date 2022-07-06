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
    me: User
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
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
    addPost(imagekitId: ID!): User
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): User
    followUser(userId: ID!): User
    unfollowUser(userId: ID!): User
  }
`;

module.exports = typeDefs;
