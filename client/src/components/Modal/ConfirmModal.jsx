import React from 'react';
import { motion } from 'framer-motion';
import './Modal.scss';
import { IoIosClose } from 'react-icons/io';
import { deletePost } from '../../api/postApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UIActions } from '../../store/slices/UiSlice';
import {
  startLoading,
  finishLoading,
} from '../../store/slices/loadingErrorSlice';

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

function ConfirmModal({ userId, postId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function closeConfirmModal() {
    dispatch(UIActions.toggleConfirm(false));
  }
  async function confirmDelete() {
    dispatch(UIActions.toggleConfirm(false));
    dispatch(startLoading());
    const response = await deletePost(userId, postId);
    console.log(response);
    dispatch(finishLoading());

    navigate('/');
  }
  return (
    <div id='confirm-backdrop'>
      <motion.div
        className='confirm-popup'
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <div>
          <IoIosClose
            size={30}
            onClick={closeConfirmModal}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <h3>Are you sure delete this post ?</h3>
        <p>If you delete this post you can't recover it.</p>
        <div>
          <button onClick={confirmDelete} className='delete-confirm'>
            Delete
          </button>
          <button onClick={closeConfirmModal} className='cancel-confirm'>
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ConfirmModal;
