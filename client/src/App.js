import React from 'react';
import {
  ApolloProvider, // special react component that we use to provide data to all of the other components
  ApolloClient, // constructor function that will help initialize the connection to the GraphQL APi server
  InMemoryCache, // enables Apollo client instance to cache API response data
  createHttpLink, // allows us to control how the Apollo client makes a request, like middleware
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Following from './pages/Following';
import Profile from './pages/Profile';
import SinglePost from './pages/SinglePost';

// create link to API
const httpLink = createHttpLink({
  uri: '/graphql',
});

// middleware to retrieve the token form localStorage and combine it with the existing httpLink
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : '' },
  };
});

// establish the new client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile'>
            <Route path=':username' element={<Profile />} />
            <Route path='' element={<Profile />} />
          </Route>
          {/* <Route path='/profile/settings' element={<ProfileSettings />} />
          <Route path='/following' element={<Following />} />
          <Route path='/thought/:id' element={<SinglePost />} /> */}
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
