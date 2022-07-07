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

// This mutation is tentative based on how we want to design the server side (naming convention)
export const SAVE_PICTURE = gql`
  mutation addPicture($id: ID!) {
    addPicture(userId: $id) {
      _id
      username
      savedPictures {
        pictureId
      }
    }
  }
`;

// Again, this is tentative as well, based on how we want to design the server side
export const REMOVE_PICTURE = gql`
  mutation deletePicture($id: pictureId!) {
    deletePicture(pictureId: $id) {
      _id
    }
  }
`;

export const UPLOAD_PICTURE = gql`
  mutation addPost($imageId: ID!) {
    addPost(imageId: $imageId) {
      _id
      username
    }
  }
`;
