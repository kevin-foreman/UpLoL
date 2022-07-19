const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Comment = require('./Comment');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Name is required',
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: 'Username is required',
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: 'Email is required',
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please fill an valid email address',
      ],
    },
    password: {
      type: String,
      required: 'Password is required',
      trim: true,
      match: [
        /\b(?=[a-zA-Z]*\d)(?=\d*[a-zA-Z])[^\s]{3,16}\b/g,
        'Password must contain 3-16 characters & a mix of letter characters and numeric characters',
      ],
    },
    profilePictureId: {
      type: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// delete all comments if the user is deleted
userSchema.pre('remove', function (next) {
  Comment.findOneAndDelete({ username: this.username }).exec();
  next();
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// add up all followed users
userSchema.virtual('followCount').get(function () {
  return this.following.length;
});

// add up all users following
userSchema.virtual('followerCount').get(function () {
  return this.followers.length;
});

// add up all posts
userSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

const User = model('User', userSchema);

module.exports = User;
