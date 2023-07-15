import React from 'react';
import './Forgot.scss';
import { FaKey } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../../api/api';
import { setError, resetError, setMessage } from '../../store/slices/loadingErrorSlice';

function Forgot() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });
  const navigate = useNavigate();
  const dispatch = useDispatch()


  async function sendOTPHandler(data) {
    try {
      const response = await api.post('/auth/forgot', {
        email: data['reset-email'],
      });
      navigate('/password/new/otp');
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
      <form onSubmit={handleSubmit(sendOTPHandler)} className='forgot-modal'>
        <div className='forgot-icon'>
          <span>
            <FaKey />
          </span>
        </div>
        <h2>Forgot Password ?</h2>
        <p>No worries, we'll send you reset OTP.</p>
        <label htmlFor='reset-email'>Email</label>
        <input
          type='email'
          name='email'
          id='reset-email'
          className={errors.email && 'error'}
          {...register('reset-email', {
            required: {
              value: true,
              message: 'Email is required',
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Invalid email format',
            },
          })}
        />
        {errors['reset-email'] && (
          <span className='feedback-error'>
            {errors['reset-email'].message}
          </span>
        )}
        <button
          disabled={errors['reset-email']}
          type='submit'
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}

export default Forgot;
