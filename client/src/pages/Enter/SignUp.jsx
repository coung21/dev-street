import React from 'react';
import './Enter.scss';
import { AiOutlineGoogle, AiFillFacebook } from 'react-icons/ai';
import {Link} from 'react-router-dom'

function SignUp() {
  return (
    <div className='card registration'>
      <div className='registration__content'>
        <h1>Welcome to Dev Street</h1>
        <p>The way to the top of programming.</p>
      </div>
      <div className='registration__actions'>
        <div className='registration__actions--providers'>
          <button className='google'>
            <AiOutlineGoogle size={17} style={{ marginRight: '0.5rem' }} />
            Continue with Google
          </button>
          <button className='facebook'>
            <AiFillFacebook size={17} style={{ marginRight: '0.5rem' }} />
            Continue with Facebook
          </button>
        </div>
        <div className='registration__hr'>
          <span>Continue with your email address</span>
        </div>
        <form id='email-form' className='registration__actions--email'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='text' />
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' />
          <label htmlFor='confirm'>Confirm Password</label>
          <input id='confirm' type='password' />
        <button form='email-form'>Sign Up</button>
        </form>
        <div className='registration__hr'>
          <span>Already have an account? <Link to={'/signin'}>Sign In</Link></span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
