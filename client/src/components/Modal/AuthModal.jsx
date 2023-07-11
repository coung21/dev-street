import React from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
import { IoIosClose } from 'react-icons/io';
import logo from '../../assets/DEV.png';
import {Link} from 'react-router-dom'

function AuthModal() {
  function onCloseAuthModal(){
    document.getElementById('auth-backdrop').style.display = 'none'
  }
  return createPortal(
    <div className='modal-box'>
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
                We're a place where coders share, stay up-to-date and grow their
                careers.
              </p>
            </div>
            <div className='auth-modal__actions'>
              <Link onClick={onCloseAuthModal} to={'/signup'}>Login</Link>
              <Link onClick={onCloseAuthModal} to={'/signin'}>Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('auth-backdrop')
  );
}

export default AuthModal;
