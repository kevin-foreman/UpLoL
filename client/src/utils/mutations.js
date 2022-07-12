import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      name: $name
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

// Again, this is tentative as well, based on how we want to design the server side
export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
    }
  }
`;

export const UPLOAD_PICTURE = gql`
  mutation addPost($imageId: String!, $title: String!) {
    addPost(imageId: $imageId, title: $title) {
      _id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($name: String, $profilePictureId: String) {
    updateUser(name: $name, profilePictureId: $profilePictureId) {
      _id
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation followUser($userId: ID!) {
    followUser(userId: $userId) {
      name
      username
      followCount
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation unfollowUser($userId: ID!) {
    unfollowUser(userId: $userId) {
      name
      username
      followCount
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      likeCount
    }
  }
`;
