import React, { useState } from 'react';
import './Forgot.scss';
import { MdMarkEmailUnread } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
  setError,
  resetError,
  setMessage,
} from '../../store/slices/loadingErrorSlice';
import { useDispatch } from 'react-redux';

import api from '../../api/api';

function OTP() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pass, setPass] = useState('');
  const [otp, setOtp] = useState('');

  function passHandler(event){
    setPass(event.target.value)
  }

  function otpHandler(event){
    setOtp(event.target.value)
  }

  async function onSubmit() {
    try {
      const response = await api.post(`/auth/reset/${otp}`, {newPassword: pass});
      navigate('/')
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
      dispatch(setError());
      setTimeout(() => {
        dispatch(resetError());
        setMessage('');
      }, 3000);
    }
  }
  return (
    <div className='forgot-layout'>
      <div className='forgot-modal'>
        <div className='forgot-icon'>
          <span>
            <MdMarkEmailUnread />
          </span>
        </div>
        <h2>OTP</h2>
        <p>Check your email and enter your OTP.</p>
        <label htmlFor=''>New Password</label>
        <input
          type='text'
          style={{ marginBottom: '1rem' }}
          value={pass}
          onChange={passHandler}
        />
        <label htmlFor=''>OTP</label>
        <input
          type='text'
          value={otp}
          onChange={otpHandler}
        />
        <button onClick={onSubmit}>Confirm</button>
      </div>
    </div>
  );
}


export default OTP;
