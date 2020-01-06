import Router from 'next/router';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export const WelcomePage = ({ query }) => {
  useEffect(() => {
    Cookies.set('token', query.access_token);
    Router.push('/');
  });
  return <div>Loading ..</div>;
};

export default WelcomePage;
