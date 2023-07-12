import React from 'react';
import { Link } from 'react-router-dom';

const NotCompletedPage = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>This page is not completed yet</h2>
      <Link style={{color: 'blue', textDecoration: 'underline'}} to={'/'}>Get back</Link>
    </div>
  );
};

export default NotCompletedPage;
