import React from 'react';
import { motion } from 'framer-motion';
import './Modal.scss';
import { IoIosClose } from 'react-icons/io';
import logo from '../../assets/DEV.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UIActions } from '../../store/slices/UiSlice';

const modalVariants = {
  hidden: {
    opacity: 0,
    y: -100,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    y: -100,
    scale: 0.5,
    transition: {
      duration: 0.3,
    },
  },
};

function AuthModal() {
  const dispatch = useDispatch();
  function onCloseAuthModal() {
    dispatch(UIActions.toggleAuthModal(false));
  }
  return (
    <div id='auth-backdrop'>
      <motion.div
        className='modal-box'
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <header className='modal-box__header'>
          <h3>Log in to continue</h3>
          <button onClick={onCloseAuthModal}>
            <IoIosClose size={30} />
          </button>
        </header>
        <div className='modal-box__body'>
          <div style={{ width: '100%', height: '100%' }}>
            <div className='auth-modal__container'>
              <figure>
                <img src={logo} alt='' />
              </figure>
              <div>
                <p>
                  We're a place where coders share, stay up-to-date and grow
                  their careers.
                </p>
              </div>
              <div className='auth-modal__actions'>
                <Link onClick={onCloseAuthModal} to={'/signin'}>
                  Login
                </Link>
                <Link onClick={onCloseAuthModal} to={'/signup'}>
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthModal;
