import React from 'react';
import './About.scss'
import {Link} from 'react-router-dom'

function About() {
  return (
    <div className='about'>
      <p className='about__bold'>
        <Link to={'/'} className='about__bold--co hvr-underline'>
          DEV Street
        </Link>{' '}
        is a community of amazing developers
      </p>
      <p>
        We're a place where coders share, stay up-to-date and grow their
        careers.
      </p>
    </div>
  );
}

export default About;
