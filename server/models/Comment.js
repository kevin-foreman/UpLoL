const { Schema } = require('mongoose');
const moment = require('moment');

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      maxlength: 180,
    },
    username: {
      type: String,
      required: true,
    },
    profilePictureId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: moment,
      get: (createdAtVal) => {
        return moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a');
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = commentSchema;
