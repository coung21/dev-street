import React from 'react';
import './PostItem.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function PostItem({ data, index }) {
  const { current_user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation()
  function navigateToProfile(event) {
    event.stopPropagation();
    navigate(`/${data.author._id}`);
  }
  function navigateToPost(event){
    event.stopPropagation();
    navigate(`/${data.author._id}/${data.url}`)
  }
  return (
    <div onClick={navigateToPost}>
      {index === 0 && location.pathname === '/' && (
        <div className='post-item__cover'>
          <img src={data.image} alt='cover' />
        </div>
      )}
      <div
        className='post-item__body'
        style={{
          borderTop: index === 0 && location.pathname === '/' ? 'none' : null,
          borderTopLeftRadius:
            index === 0 && location.pathname === '/' ? '0px' : null,
          borderTopRightRadius:
            index === 0 && location.pathname === '/' ? '0px' : null,
        }}
      >
        <div className='post-item__top'>
          <div className='post-item__meta'>
            <div className='post-item__author-pic'>
              <img
                onClick={navigateToProfile}
                src={data.author.avatar}
                alt={data.author.name || data.author.username}
                style={{ width: '32px', height: '32px' }}
              />
            </div>
            <div onClick={navigateToProfile}>
              <Link>{data.author.name || data.author.username}</Link>
              <div className='meta__time'>
                {new Date(data.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='post-item__indention'>
          <h2>{data.title}</h2>
          <div className='post-item__tags'>
            {data.tags.map((item, i) => (
              <Link className='tag' key={i}>
                #{item.name}
              </Link>
            ))}
          </div>
          <div className='post-item__bottom'>
            <div className='post-item__detail'>
              <div className='detail__like'>
                <AiFillHeart size={23} className='detail__like-icon' />
                <span>{data.likes.length} Likes</span>
              </div>
              <div className='detail__cmt'>
                <FaRegComment size={23} />
                <span>{data.comments.length} Comments</span>
              </div>
            </div>
            <div className='post-item__save'>
              {data.bookmarks.includes(current_user?._id) ? (
                <BsBookmarkFill size={20} style={{ color: '#f5a216' }} />
              ) : (
                <BsBookmark size={20} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
