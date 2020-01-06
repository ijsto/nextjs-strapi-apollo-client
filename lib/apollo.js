import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import Cookies from 'js-cookie';
import fetch from 'isomorphic-unfetch';
import withApollo from 'next-with-apollo';

const GRAPHQL_URL = process.env.BACKEND_URL || 'http://localhost:1337/graphql';

const httpLink = createHttpLink({
  fetch,
  uri: GRAPHQL_URL
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('jwt');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
  // also: { ctx, headers }
  ({ initialState }) =>
    new ApolloClient({
      link: authLink.concat(httpLink),
      credentials: 'include',
      cache: new InMemoryCache().restore(initialState || {})
    })
);
