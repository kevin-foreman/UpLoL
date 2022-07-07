import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      username
      email
      followCount
      followerCount
      postCount
      posts {
        _id
        imageId
        createdAt
        username
        replyCount
        likeCount
      }
      following {
        _id
        name
        username
      }
      followers {
        _id
        name
        username
      }
    }
  }
`;
