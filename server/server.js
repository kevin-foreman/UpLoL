const express = require('express');
const path = require('path');
// import apollo server
const { ApolloServer } = require('apollo-server-express');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

// import our middleware to verify the jwt
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// create a new Apollo server and pass in our schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // verify the jwt upon every server request, & pass the updated request obj as context
  context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a new instance of an apollo server with the graphql schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate our apollo server with the express application as middleware, creating a "/graphql" endpoint
  server.applyMiddleware({ app });

  // serve up static assets
  if (process.env.NODE_ENV === 'production') {
    // instruct the express.js server to serve any files in the react apps build directory in the client folder
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // if a user makes a get request to any location that  isn't explicitly defined, respond with the production-ready react front end code
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // log where we can go to test our gql api
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// call the async function to start the server
startApolloServer(typeDefs, resolvers);
