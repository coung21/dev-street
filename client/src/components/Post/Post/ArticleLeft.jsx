import React, { useState, useContext } from 'react';
import { SocketContext } from '../../../contexts/SocketContext';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { likePost, unlikePost, bookmark, unBookmark } from '../../../api/postApi';

function ArticleLeft({ data }) {
  if (!data) {
    return <div></div>;
  }
  const socket = useContext(SocketContext);
  const { current_user } = useSelector((state) => state.auth);
  const [isLiked, setLiked] = useState(data.likes.includes(current_user?._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [isSaved, setSaved] = useState(data.bookmarks.includes(current_user?._id));
  const [saves, setSaves] = useState(data.bookmarks.length)

  async function likeHandler() {
    if (current_user && socket && !isLiked) {
      setLiked((prev) => !prev);
      setLikes(prev => prev + 1)
      if (current_user?._id !== data.author._id){
        socket.emit('like', {
          sender: { id: current_user?._id, username: current_user?.username },
          receiver: { id: data.author._id, username: data.author.username },
          postId: data?._id,
        });
      }
      await likePost(current_user?._id, data?._id)
    }
  }
  async function unlikeHandler() {
    if (current_user && socket && isLiked) {
      setLiked((prev) => !prev);
      setLikes(prev => prev - 1)
      await unlikePost(current_user?._id, data?._id)
    }
  }
  async function saveHandler() {
    if (current_user && !isSaved) {
      setSaved((prev) => !prev);
      setSaves(prev => prev + 1)
      await bookmark(current_user?._id, data?._id);
    }
    // socket.emit('bookmark', {
    //   sender: { id: current_user?._id, username: current_user.username },
    //   receiver: { id: data.author._id, username: data.author.username },
    //   postId: data._id,
    // });
  }

  async function unSaveHandler(){
    if (current_user && isSaved) {
      setSaved((prev) => !prev);
      setSaves((prev) => prev - 1);
      await unBookmark(current_user?._id, data?._id);
    }
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
                  onClick={unlikeHandler}
                />
              ) : (
                <AiOutlineHeart
                  style={{ width: '100%', height: '100%' }}
                  onClick={likeHandler}
                />
              )}
            </button>
            <div>{likes}</div>
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
            >
              {isSaved ? (
                <BsBookmarkFill
                  style={{ color: '#f5a216', width: '100%', height: '100%' }}
                  onClick={unSaveHandler}
                />
              ) : (
                <BsBookmark
                  style={{ width: '100%', height: '100%' }}
                  onClick={saveHandler}
                />
              )}
            </button>
            <div>{saves}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default ArticleLeft;
