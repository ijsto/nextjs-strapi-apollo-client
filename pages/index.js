import Jumbo from '../components/dataDisplay/Jumbo';
import QuerySample from '../components/QuerySample';
import MutationSample from '../components/MutationSample';
import defaultPage from '../hoc/defaultPage';
import { userLogin, userLogout, userRegister } from '../lib/auth';

const Index = props => {
  const { isAuthenticated } = props;
  return (
    <div style={{ maxWidth: '90%', margin: '0 auto' }}>
      <Jumbo>
        <h1>Next.js with GraphQL Apollo Client</h1>
      </Jumbo>

      <pre>{JSON.stringify(props)}</pre>

      {isAuthenticated ? (
        <button
          type="button"
          onClick={() => {
            userLogout();
          }}
        >
          LOG OUT
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={() => userLogin('user1577641791788', 'password23456')}
          >
            LOG IN
          </button>
          <button
            type="button"
            onClick={() =>
              userRegister(
                `user${Date.now()}`,
                `user${Date.now()}@ijs.to`,
                'password2345'
              )}
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
