import React from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
import { IoIosClose } from 'react-icons/io';
import { deletePost } from '../../api/postApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {startLoading, finishLoading} from '../../store/slices/loadingErrorSlice'
function ConfirmModal({userId, postId}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function closeConfirmModal(){
    document.getElementById('backdrop').style.display = 'none'
  }
  async function confirmDelete(){
    document.getElementById('backdrop').style.display = 'none';
    dispatch(startLoading())
    const response = await deletePost(userId, postId)
    console.log(response)
    dispatch(finishLoading())

    navigate('/')
  }
  return createPortal(
    <div className='confirm-popup'>
      <div>
        <IoIosClose size={30} onClick={closeConfirmModal} style={{cursor: 'pointer'}}/>
      </div>
      <h3>Are you sure delete this post ?</h3>
      <p>If you delete this post you can't recover it.</p>
      <div>
        <button onClick={confirmDelete} className='delete-confirm'>Delete</button>
        <button onClick={closeConfirmModal} className='cancel-confirm'>
          Cancel
        </button>
      </div>
    </div>,
    document.getElementById('confirm-backdrop')
  );
}

export default ConfirmModal;
