import React from 'react';
import './SignOut.scss';
import Auth from '../../store/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
function SignOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { error } = useSelector((state) => state.loadingError);
  async function handleSignOut() {
    dispatch(Auth.logout());

        navigate('/');
  }
  return (
    <div className='signout-wrapper'>
      <div>
        <h1>Are you sure you want to sign out?</h1>
        <button onClick={handleSignOut}>Yes, sign out</button>
      </div>
    </div>
  );
}

export default SignOut;
