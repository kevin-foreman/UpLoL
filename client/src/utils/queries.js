import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      username
      email
      profilePictureId
      followCount
      followerCount
      postCount
      posts {
        _id
        imageId
        title
        createdAt
        username
        replyCount
        likeCount
        likes {
          _id
          name
          username
          followerCount
        }
      }
      following {
        _id
        name
        username
        followerCount
      }
      followers {
        _id
        name
        username
        followerCount
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      name
      username
      email
      profilePictureId
      followCount
      followerCount
      postCount
      posts {
        _id
        imageId
        title
        createdAt
        username
        replyCount
        likeCount
        likes {
          _id
          name
          username
          followerCount
        }
      }
      following {
        _id
        name
        username
        followerCount
      }
      followers {
        _id
        name
        username
        followerCount
      }
    }
  }
`;

export const IS_FOLLOWING = gql`
  query isFollowing($id: ID!) {
    isFollowing(_id: $id)
  }
`;

export const QUERY_POST = gql`
  query post($id: ID!) {
    post(_id: $id) {
      _id
      imageId
      title
      createdAt
      username
      replyCount
      likeCount
      likes {
        _id
        name
        username
        followerCount
      }
    }
  }
}
`;
