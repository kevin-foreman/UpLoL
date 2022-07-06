const path = require('path');
require('dotenv').config({ path: '../../.env' });
// Update the auth middleware function to work with the GraphQL API.

const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = process.env.SECRET;
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(` `).pop().trim();
    }

    // if no token, return request object as is
    if (!token) {
      return req;
    }

    try {
      // decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      // we don't want an error on every request, so users with an invalid token should still be able to request and see all thoughts
      // thus, we wrapped the .verify() in a try/catch to mute the error.
      console.log('Invalid token');
    }

    // return updated request object
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
