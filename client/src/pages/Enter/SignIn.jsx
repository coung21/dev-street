import React from 'react'
import {Link} from 'react-router-dom'
import './Enter.scss';
import { AiOutlineGoogle, AiFillFacebook } from 'react-icons/ai';

function SignIn() {
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
        <form className='registration__actions--email'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='text' />
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' />
          <button>Sign In</button>
        </form>
          <span className='registration__actions--forgot'>
        <Link to={'/password/new'}>
            I forgot my password
        </Link>
          </span>
      </div>
    </div>
  );
}

export default SignIn