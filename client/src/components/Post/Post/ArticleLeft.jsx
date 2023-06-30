import React, { useState, useContext } from 'react';
import { SocketContext } from '../../../contexts/SocketContext';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import { useSelector } from 'react-redux';

function ArticleLeft({ data }) {
  if (!data) {
    return <div></div>;
  }
  const socket = useContext(SocketContext);
  const { current_user } = useSelector((state) => state.auth);
  const [isLiked, setLiked] = useState(data.likes.includes(current_user?._id));
  const [isSaved, setSaved] = useState(
    data.bookmarks.includes(current_user?._id)
  );
  async function likeHandler() {
    if (current_user && socket) {
      setLiked((prev) => !prev);
      socket.emit('like', {
        sender: { id: current_user?._id, username: current_user?.username },
        receiver: { id: data.author._id, username: data.author.username },
        postId: data?._id,
      });
    }
  }
  async function unlikeHandler() {
    if (current_user && socket) {
      setLiked((prev) => !prev);
    }
  }
  async function saveHandler() {
    setSaved((prev) => !prev);
    socket.emit('bookmark', {
      sender: { id: current_user?._id, username: current_user.username },
      receiver: { id: data.author._id, username: data.author.username },
      postId: data._id,
    });
  }

  return (
    <aside className='article__left'>
      <div className='article-actions'>
        <div className='article-actions__inner'>
          <div className='reactions'>
            <button
              className='btn-like'
              style={{ width: '27px', height: '27px' }}
            >
              {isLiked ? (
                <AiFillHeart
                  style={{ color: '#e74559', width: '100%', height: '100%' }}
                  onClick={
                    current_user?._id !== data.author._id ? unlikeHandler : null
                  }
                />
              ) : (
                <AiOutlineHeart
                  style={{ width: '100%', height: '100%' }}
                  onClick={
                    current_user?._id !== data.author._id ? likeHandler : null
                  }
                />
              )}
            </button>
            <div>{data.likes.length}</div>
          </div>
          <div className='reactions'>
            <button
              className='btn-cmt'
              style={{ width: '25px', height: '25px' }}
            >
              <GoComment style={{ width: '100%', height: '100%' }} />
            </button>
            <div>{data.comments.length}</div>
          </div>
          <div className='reactions'>
            <button
              className='btn-save'
              style={{ width: '23px', height: '23px' }}
              onClick={saveHandler}
            >
              {isSaved ? (
                <BsBookmarkFill
                  style={{ color: '#f5a216', width: '100%', height: '100%' }}
                />
              ) : (
                <BsBookmark style={{ width: '100%', height: '100%' }} />
              )}
            </button>
            <div>{data.bookmarks.length}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default ArticleLeft;
