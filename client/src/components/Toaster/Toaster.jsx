import React from 'react';
import './Toaster.scss';
import { FcOk, FcHighPriority } from 'react-icons/fc';
import {  motion } from 'framer-motion';

function Toaster({ success, message }) {
  return (
    <motion.div
      className='toaster'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{duration: 0.4, delay: 0.2}}
    >
      {success ? (
        <div className='toaster__container--success'>
          <div className='toaster__icon'>
            <FcOk size={25} />
          </div>
          <div className='toaster__content'>
            <h3>Success</h3>
            <p>{message}</p>
          </div>
        </div>
      ) : !success ? (
        <div className='toaster__container--fail'>
          <div className='toaster__icon'>
            <FcHighPriority size={25} />
          </div>
          <div className='toaster__content'>
            <h3>Fail</h3>
            <p>{message}</p>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}

export default Toaster;
