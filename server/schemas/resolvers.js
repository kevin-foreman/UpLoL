const { AuthenticationError } = require('apollo-server-express');
const ObjectId = require('mongodb').ObjectId;
const { User, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('posts')
          .populate('following')
          .populate('followers');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v')
        .populate('posts')
        .populate('following')
        .populate('followers');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('posts')
        .populate('following')
        .populate('followers');
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { _id }) => {
      return Post.findOne({ _id }).populate('comments');
    },
    isFollowing: async (parent, { _id }, context) => {
      console.log('inside isFollowing');
      console.log(_id);
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })
        .select('-__v')
        .populate('posts')
        .populate('following')
        .populate('followers');
      if (!user) {
        throw new AuthenticationError('Incorrect Credentials');
      }
      console.log(user);
      const correctPass = await user.isCorrectPassword(password);
      if (!correctPass) {
        throw new AuthenticationError('Incorrect Credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        })
          .select('-__v -password')
          .populate('posts')
          .populate('following')
          .populate('followers');
      }

      throw new AuthenticationError('Not logged in');
    },
    addPost: async (parent, args, context) => {
      console.log(args);
      if (context.user) {
        const post = await Post.create({
          ...args,
          username: context.user.username,
        });
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } },
          { new: true }
        )
          .select('-__v -password')
          .populate('posts')
          .populate('following')
          .populate('followers');
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in to post images');
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { commentText, username: context.username },
            },
          },
          { new: true }
        );
        return updatedPost;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    removePost: async (parent, { postId }, context) => {
      console.log('Backend Deleting: ', postId);
      if (context.user) {
        await Post.findOneAndDelete({ imageId: postId });
        return User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('posts')
          .populate('following')
          .populate('followers');
      }
      throw new AuthenticationError('You need to be logged in');
    },
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        const updatedPost = await Post.findByIdAndUpdate(
          { _id: postId },
          { $pull: { comments: { _id: commentId } } },
          { new: true }
        );
        return updatedPost;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    followUser: async (parent, { userId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { following: userId } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          userId,
          { $addToSet: { followers: context.user._id } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    unfollowUser: async (parent, { userId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { following: userId } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          userId,
          { $pull: { followers: context.user._id } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    likePost: async (parent, { postId }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $addToSet: { likes: context.user._id } },
          { new: true }
        );
        return updatedPost;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    unlikePost: async (parent, { postId }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $pull: { likes: context.user._id } },
          { new: true }
        );
        return updatedPost;
      }
      throw new AuthenticationError('You need to be logged in');
    },
  },
};

module.exports = resolvers;
