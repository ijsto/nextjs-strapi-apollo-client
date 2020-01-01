/* eslint-disable no-sequences */
/* eslint-disable prefer-destructuring */
import Router from 'next/router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const apiUrl = process.env.API_URL || 'http://localhost:1337';

export const setToken = payload => {
  if (!process.browser) {
    return;
  }

  Cookies.set('userId', payload.user.id);
  Cookies.set('username', payload.user.username);
  Cookies.set('jwt', payload.jwt);

  if (Cookies.get('username')) {
    Router.push('/');
  }
};

export const unsetToken = () => {
  if (!process.browser) {
    return;
  }
  Cookies.remove('jwt');
  Cookies.remove('username');
  Cookies.remove('userId');

  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  Router.push('/');
};

export const userRegister = (username, email, password) => {
  axios
    .post(`${apiUrl}/auth/local/register`, {
      username,
      email,
      password
    })
    .then(res => {
      setToken(res.data);
    })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error);
    });
};

export const userLogin = (identifier, password) => {
  if (!process.browser) {
    return;
  }
  axios
    .post(`${apiUrl}/auth/local`, {
      identifier,
      password
    })
    .then(res => {
      setToken(res.data);
    })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error);
    });
};

export const userLogout = (identifier, password) => {
  if (!process.browser) {
    return;
  }
  unsetToken();
};

export const getUserFromServerCookie = req => {
  if (!req.headers.cookie || '') {
    return undefined;
  }

  let username = req.headers.cookie
    .split(';')
    .find(user => user.trim().startsWith('username='));
  if (username) {
    username = username.split('=')[1];
  }

  const jwtCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('jwt='));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split('=')[1];
  return jwtDecode(jwt), username;
};

export const getUserFromLocalCookie = () => {
  return Cookies.get('username');
};

export const getUserIdFromServerCookie = req => {
  if (!req.headers.cookie || '') {
    return undefined;
  }

  let userId = req.headers.cookie
    .split(';')
    .find(user => user.trim().startsWith('userId='));
  if (userId) {
    userId = userId.split('=')[1];
  }

  const jwtCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('jwt='));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split('=')[1];
  return jwtDecode(jwt), userId;
};

export const getUserIdFromLocalCookie = () => {
  return Cookies.get('userId');
};

// these will be used if you expand to a provider such as Auth0
const getQueryParams = () => {
  const params = {};
  window.location.href.replace(
    /([^(?|#)=&]+)(=([^&]*))?/g,
    ($0, $1, $2, $3) => {
      params[$1] = $3;
    }
  );
  return params;
};
export const extractInfoFromHash = () => {
  if (!process.browser) {
    return undefined;
  }
  const { id_token, state } = getQueryParams();
  return { token: id_token, secret: state };
};
