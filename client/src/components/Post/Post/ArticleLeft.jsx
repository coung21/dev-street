import React, {useState} from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import {useSelector} from 'react-redux'

function ArticleLeft({data}) {
  if(!data){
    return <div></div>
  }
  const { current_user } = useSelector((state) => state.auth);
  const [isLiked, setLiked] = useState(data.likes.includes(current_user._id))
  const [isSaved, setSaved] = useState(data.bookmarks.includes(current_user._id));
  async function likeHandler(){
    setLiked(prev => !prev)
  }
  async function saveHandler(){
    setSaved((prev) => !prev);
  }

  return (
    <aside className='article__left'>
      <div className='article-actions'>
        <div className='article-actions__inner'>
          <div className='reactions'>
            <button className='btn-like' onClick={likeHandler}>
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
