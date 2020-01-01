import React from 'react';
import Router from 'next/router';

import {
  getUserFromServerCookie,
  getUserFromLocalCookie,
  getUserIdFromServerCookie,
  getUserIdFromLocalCookie
} from '../lib/auth';

export default Page =>
  class DefaultPage extends React.Component {
    static async getInitialProps({ req }) {
      const username = process.browser
        ? getUserFromLocalCookie()
        : getUserFromServerCookie(req);
      const userId = process.browser
        ? getUserIdFromLocalCookie()
        : getUserIdFromServerCookie(req);
      const currentUser = { userId, username };

      const pageProps = Page.getInitialProps && Page.getInitialProps(req);

      let path = req ? req.pathname : '';
      path = '';

      return {
        ...pageProps,
        currentUser,
        currentUrl: path,
        isAuthenticated: !!username
      };
    }

    componentDidMount() {
      window.addEventListener('storage', this.logout, false);
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.logout, false);
    }

    logout = eve => {
      if (eve.key === 'logout') {
        Router.push(`/?logout=${eve.newValue}`);
      }
    };

    render() {
      return <Page {...this.props} />;
    }
  };
