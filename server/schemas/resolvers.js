const { AuthenticationError } = require('apollo-server-express');
const ObjectId = require('mongodb').ObjectId;
const { User, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        );
        // .populate('');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('posts')
        .populate('following')
        .populate('followers');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('posts')
        .populate('following');
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { _id }) => {
      return Post.findOne({ _id }).populate('comments');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })
        .select('-__v')
        .populate('posts')
        .populate('following');
      if (!user) {
        throw new AuthenticationError('Incorrect Credentials');
      }
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
        });
      }

      throw new AuthenticationError('Not logged in');
    },
    addPost: async (parent, args, context) => {
      if (context.user) {
        const post = await Post.create({
          ...args,
          username: context.user.username,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );
        return post;
      }
      throw new AuthenticationError('You need to be logged in to post images');
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        const updatedPost = await Post.findByIdAndUpdate(
          { _id: postId },
          { $push: { comments: { commentText, username: context.username } } },
          { new: true }
        );
        return updatedPost;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: { _id: postId } } },
          { new: true }
        );
        await Post.findByIdAndDelete(postId);
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    // addFollower: async (parent, { followerId }, context) => {
    //   if (context.user) {
    //     const updatedUser = await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { followers: followerId } },
    //       { new: true }
    //     );
    //     return updatedUser;
    //   }
    //   throw new AuthenticationError('You need to be logged in');
    // },
    followUser: async (parent, { userId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { following: userId } },
          { new: true }
        ).then(() => {
          User.findByIdAndUpdate(
            userId,
            { $addToSet: { followers: context.user._id } },
            { new: true }
          );
        });
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in');
    },
    unfollowUser: async (parent, { userId }, context) => {
      console.log(context.user);
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { following: userId } },
          { new: true }
        ).then(() => {
          User.findByIdAndUpdate(
            userId,
            { $pull: { followers: context.user._id } },
            { new: true }
          );
        });
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in');
    },
  },
};

module.exports = resolvers;
