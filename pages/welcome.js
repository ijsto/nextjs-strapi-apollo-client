import Cookies from 'js-cookie';
import { useEffect } from 'react';

export const WelcomePage = ({ query }) => {
  useEffect(() => {
    console.log('Mounted', { query });
    Cookies.set('token', query.access_token);
  });
  return (
    <>
      <h2>Welcome</h2>
      <div>To this page</div>
    </>
  );
};

export default WelcomePage;
