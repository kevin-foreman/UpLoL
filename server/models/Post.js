const router = require('express').Router();
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateformat');

const PostSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Thought cannot be blank',
      minlength: 1,
      maxlength: 128,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => dateFormat(createdAt),
    },
    username: {
      type: String,
      required: 'A valid username must be used',
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
