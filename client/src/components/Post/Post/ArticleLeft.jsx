import React, { useState, useContext } from 'react';
import { SocketContext } from '../../../contexts/SocketContext';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import { useSelector } from 'react-redux'

function ArticleLeft({ data }) {
  if (!data) {
    return <div></div>;
  }
  const socket = useContext(SocketContext);
  const { current_user } = useSelector((state) => state.auth);
  const [isLiked, setLiked] = useState(data.likes.includes(current_user._id));
  const [isSaved, setSaved] = useState(
    data.bookmarks.includes(current_user._id)
  );
  async function likeHandler() {
    setLiked((prev) => !prev);
    // if(!isLiked){
      socket.emit('like', {
        sender: { id: current_user._id, username: current_user.username },
        receiver: { id: data.author._id, username: data.author.username },
        postId: data._id
      });
    // }
  }
  async function saveHandler() {
    setSaved((prev) => !prev);
    socket.emit('bookmark', {
      sender: { id: current_user._id, username: current_user.username },
      receiver: { id: data.author._id, username: data.author.username },
      postId: data._id
    });
  }

  return (
    <aside className='article__left'>
      <div className='article-actions'>
        <div className='article-actions__inner'>
          <div className='reactions'>
            <button
              className='btn-like'
              onClick={ current_user._id !== data.author._id ? likeHandler : null}
            >
              {isLiked ? (
                <AiFillHeart style={{ color: '#e74559' }} size={27} />
              ) : (
                <AiOutlineHeart size={27} />
              )}
            </button>
            <div>{data.likes.length}</div>
          </div>
          <div className='reactions'>
            <button className='btn-cmt'>
              <GoComment size={25} />
            </button>
            <div>{data.comments.length}</div>
          </div>
          <div className='reactions'>
            <button className='btn-save' onClick={saveHandler}>
              {isSaved ? (
                <BsBookmarkFill size={23} style={{ color: '#f5a216' }} />
              ) : (
                <BsBookmark size={23} />
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
