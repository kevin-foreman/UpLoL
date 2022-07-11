const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
    profilePictureId: String
    followCount: Int
    followerCount: Int
    postCount: Int
    posts: [Post]
    following: [User]
    followers: [User]
  }

  type Post {
    _id: ID
    imageId: String
    title: String
    createdAt: String
    username: String
    likes: [User]
    replyCount: Int
    likeCount: Int
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
    isFollowing(_id: ID!): Boolean
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      username: String!
      name: String!
      email: String!
      password: String!
    ): Auth
    updateUser(name: String, profilePictureId: String): User
    addPost(imageId: String!, title: String!): User
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): User
    removeComment(postId: ID!, commentId: ID!): Post
    followUser(userId: ID!): User
    unfollowUser(userId: ID!): User
    likePost(postId: ID!): Post
    unlikePost(postId: ID!): Post
  }
`;

module.exports = typeDefs;
