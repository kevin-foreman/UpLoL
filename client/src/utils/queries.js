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
        replyCount
        username
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
      post {
        _id
        imageId
        title
        createdAt
        replyCount
        likeCount
        likes {
          name
          username
          followerCount
        }
        comments {
          _id
          commentText
          username
          name
          createdAt
          profilePictureId
        }
      }
      user {
        _id
        name
        username
        followerCount
        profilePictureId
      }
    }
  }
`;

export const QUERY_FOLLOWED_USER_POSTS = gql`
  query posts {
    posts {
      _id
      name
      username
      followerCount
      posts {
        _id
        imageId
        title
        createdAt
        username
        replyCount
        likeCount
      }
    }
  }
`;

export const QUERY_TOP_POSTS = gql`
  query topPosts {
    topPosts {
      _id
      imageId
      title
      createdAt
      username
      replyCount
      likeCount
    }
  }
`;
