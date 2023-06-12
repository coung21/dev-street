import React from 'react';
import './SignOut.scss';

function SignOut() {
  return (
    <div className='signout-wrapper'>
      <div>
        <h1>Are you sure you want to sign out?</h1>
        <button>Yes, sign out</button>
      </div>
    </div>
  );
}

export default SignOut;
