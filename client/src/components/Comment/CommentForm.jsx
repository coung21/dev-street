import React, { useState, useContext } from 'react';
import placeholderAvatar from '../../assets/DEV.png';
import { postComment } from '../../api/postApi';
import { SocketContext } from '../../contexts/SocketContext';
import { useSelector } from 'react-redux';

function CommentForm({
  activeReply = false,
  setActiveReply,
  setNewComment,
  parentId = null,
  postId,
  postOwner,
}) {
  const [text, setText] = useState('');
  const { current_user } = useSelector((state) => state.auth);
  const socket = useContext(SocketContext);
  function inputHandler(event) {
    setText(event.target.value);
  }

  async function submitHandler(event) {
    event.preventDefault();
    if (postOwner._id !== current_user?._id) {
      socket.emit('comment', {
        sender: { id: current_user?._id, username: current_user?.username },
        receiver: { id: postOwner._id, username: postOwner.username },
        postId: postId,
      });
      const response = await postComment(postId, current_user?._id, text, parentId)
      console.log(response.data)
      setNewComment(response.data)
    } else {
      const response = await postComment(postId, current_user?._id, text, parentId)
      setNewComment(response.data)
    }
    setText('')
    setActiveReply(false)
  }
  return (
    <div className='comment-form__container'>
      <div className='comment-form'>
        <img src={current_user?.avatar || placeholderAvatar} alt='' />
        <textarea
          name='comment'
          placeholder='Add to the discussion'
          value={text}
          onChange={inputHandler}
        />
      </div>
      {text.length > 0 && (
        <>
          <button onClick={submitHandler} className='comment-btn'>Submit</button>
          <button
            onClick={
              activeReply ? () => setActiveReply(false) : () => setText('')
            }
            className='dismiss-btn'
          >
            Dismiss
          </button>
        </>
      )}
    </div>
  );
}

export default CommentForm;
