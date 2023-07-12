import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <p>
        Dev Street is a clone of{' '}
        <a href='https://dev.to/' className='hvr-underline'>
          Dev Community
        </a>{' '}
        (A constructive and inclusive social network for software developers)
      </p>
      <p>
        Made with love by{' '}
        <a href='https://github.com/coung21' className='hvr-underline'>
          Coung21
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
