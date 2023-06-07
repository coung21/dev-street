import React from 'react';
import './Enter.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import authAction from '../../store/actions/authAction';
import Toaster from '../../components/Toaster/Toaster';
import { AnimatePresence } from 'framer-motion';
function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ mode: 'onTouched' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message } = useSelector((state) => state.loadingError);
  // const { message } = useSelector((state) => state.auth);

  async function onSubmit(data) {
    dispatch(authAction.login(data));
    if(error === false){
      navigate('/')
    }
  }
  function googleLogin() {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
  }

  return (
    <>
      <div className='card registration'>
        <div className='registration__content'>
          <h1>Welcome to Dev Street</h1>
          <p>The way to the top of programming.</p>
        </div>
        <div className='registration__actions'>
          <div className='registration__actions--providers'>
            <button onClick={googleLogin} className='google'>
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
            onSubmit={handleSubmit(onSubmit)}
            className='registration__actions--email'
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
              className={errors.password && 'error'}
              type='password'
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
          </form>
          <button id='enter' form='email-form'>
            Sign In
          </button>
          <span className='registration__actions--forgot'>
            <Link to={'/password/new'}>I forgot my password</Link>
          </span>
        </div>
      </div>
      <DevTool control={control} />
      <AnimatePresence>
        {error && <Toaster message={message} success={false} />}
      </AnimatePresence>
    </>
  );
}

export default SignIn;
