import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Jumbo from '../components/dataDisplay/Jumbo';
import QuerySample from '../components/QuerySample';
import MutationSample from '../components/MutationSample';
import defaultPage from '../hoc/defaultPage';
import { setToken, userLogout, userRegister } from '../lib/auth';

const ME_QY = gql`
  query {
    me {
      username
      id
      email
    }
  }
`;

const LOGIN_MT = gql`
  mutation login {
    login(input: { identifier: "scott", password: "agirs" }) {
      jwt
      user {
        id
        username
      }
    }
  }
`;

const providers = ['facebook', 'github', 'google', 'twitter']; // To remove a provider from the list just delete it from this array...

function SocialLink({ provider }) {
  return (
    <a href={`http://localhost:1337/connect/${provider}`}>
      <button type="button" social={provider} style={{ width: '100%' }}>
        {provider}
      </button>
    </a>
  );
}

const Index = props => {
  const [login, { data, loading, error }] = useMutation(LOGIN_MT, {
    onCompleted({ login: payload }) {
      setToken(payload);
    }
  });
  const { data: meData, loading: meLoading, error: meError } = useQuery(ME_QY);

  const { isAuthenticated } = props;
  // if (meLoading) return 'Meloading ..';
  // if (meError) console.log({ meError });

  return (
    <div style={{ maxWidth: '90%', margin: '0 auto' }}>
      <Jumbo>
        <h1>Next.js with GraphQL Apollo Client</h1>
      </Jumbo>

      <h2>Me {isAuthenticated ? 'is authenticated' : 'is not authenticate'}</h2>
      <pre>{JSON.stringify(data)}</pre>
      <pre>{JSON.stringify(meData)}</pre>
      <h2>Props </h2>
      <pre>{JSON.stringify(props)}</pre>
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {loading && ' Loading ...'}
      {isAuthenticated ? (
        <button type="button" onClick={userLogout}>
          LOG OUT
        </button>
      ) : (
        <>
          <div className="col-md-12">
            {providers.map(provider => (
              <SocialLink provider={provider} key={provider} />
            ))}
          </div>

          <button type="button" onClick={login}>
            LOG IN
          </button>
          <button
            type="button"
            onClick={() => userRegister(`scott`, `scott@ijs.to`, 'agirs')}
          >
            REGISTER
          </button>
        </>
      )}

      <QuerySample />
      <MutationSample />
      <a
        href="https://ijs.to/courses/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <h2>Learn code on iJS.to</h2>
      </a>
      <ul>
        <li>
          <a
            href="https://ijs.to/courses/nextjs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Next.js
          </a>
        </li>
        <li>
          <a
            href="https://ijs.to/courses/react"
            rel="noopener noreferrer"
            target="_blank"
          >
            React
          </a>
        </li>
        <li>
          <a
            href="https://ijs.to/courses/graphql"
            rel="noopener noreferrer"
            target="_blank"
          >
            GraphQL
          </a>
        </li>
        <li>
          <a
            href="https://ijs.to/courses/"
            rel="noopener noreferrer"
            target="_blank"
          >
            and other courses
          </a>
        </li>
      </ul>
    </div>
  );
};
export default defaultPage(Index);
