const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
  {
    imageId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [commentSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// ad up all comments
postSchema.virtual('replyCount').get(function () {
  return this.comments.length;
});

// add up all likes
postSchema.virtual('likeCount').get(function () {
  return this.likes.length;
});

const Post = model('Post', postSchema);

module.exports = Post;
