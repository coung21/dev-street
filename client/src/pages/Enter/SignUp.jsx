import React, { useState } from 'react';
import './Enter.scss';
import { AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import Toaster from '../../components/Toaster/Toaster';
import { AnimatePresence } from 'framer-motion';
import { signup } from '../../api/userApi';
function SignUp() {
  const [toaster, setToaster] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({ mode: 'onTouched' });
  async function onSubmit(data) {
    const { confirm, ...signupData } = data;

    try {
      const { message, status } = await signup(signupData);
      setSuccess(true);
      setMessage(message);
      setToaster(true);

      reset();
      setTimeout(() => {
        setToaster(false);
        setMessage('');
      }, 3000);
    } catch (error) {
      // Xử lý lỗi bad request
      if (error.response) {
        const { data } = error.response;
        console.log('Response:', data);
        setSuccess(false);
        setMessage(data.message);
        setToaster(true);
      }
      reset();
      setTimeout(() => {
        setToaster(false);
        setMessage('');
      }, 3000);
    }
  }

  const watchPasswordValue = watch('password');
  return (
    <>
      <div className='card registration'>
        <div className='registration__content'>
          <h1>Welcome to Dev Street</h1>
          <p>The way to the top of programming.</p>
        </div>
        <div className='registration__actions'>
          <div className='registration__actions--providers'>
            <button className='google'>
              <FcGoogle size={17} style={{ marginRight: '0.5rem' }} />
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
          <form
            id='email-form'
            className='registration__actions--email'
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='text'
              className={errors.email && 'error'}
              {...register('email', {
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
            {errors.email && (
              <span className='feedback-error'>{errors.email.message}</span>
            )}
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              className={errors.password && 'error'}
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required',
                },
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <span className='feedback-error'>{errors.password.message}</span>
            )}
            <label htmlFor='confirm'>Confirm Password</label>
            <input
              id='confirm'
              type='password'
              className={errors.confirm && 'error'}
              {...register('confirm', {
                required: {
                  value: true,
                  message: 'Confirm password is required',
                },
                validate: (value) =>
                  value === watchPasswordValue || 'Password do not match',
              })}
            />
            {errors.confirm && (
              <span className='feedback-error'>{errors.confirm.message}</span>
            )}
            <button id='enter' form='email-form'>
              Sign Up
            </button>
          </form>
          <div className='registration__hr'>
            <span>
              Already have an account? <Link to={'/signin'}>Sign In</Link>
            </span>
          </div>
        </div>
      </div>
      <DevTool control={control} />
      <AnimatePresence>
        {toaster && (
          <Toaster message={message} success={isSuccess ? true : false} />
        )}
      </AnimatePresence>
    </>
  );
}

export default SignUp;
