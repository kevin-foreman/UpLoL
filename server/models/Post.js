const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
  {
    imagekitId: {
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
    likeCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    comments: [commentSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

postSchema.virtual('replyCount').get(function () {
  return this.comments.length;
});

const Post = model('Post', postSchema);

module.exports = Post;
