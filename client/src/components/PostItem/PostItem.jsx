import React, { useEffect } from 'react';
import './PostItem.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
function PostItem({ data }) {
  const navigate = useNavigate();

  function navigateToProfile() {
    navigate(`/${data.author._id}`);
  }

  return (
    <div className='post-item__body'>
      <div className='post-item__top'>
        <div onClick={navigateToProfile} className='post-item__meta'>
          <div className='post-item__author-pic'>
            <img
              src={data.author.avatar}
              alt={data.author.name || data.author.username}
              style={{ width: '32px', height: '32px' }}
            />
          </div>
          <div>
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
              <AiFillLike size={23} className='detail__like-icon' />
              <span>{data.likes.length} Likes</span>
            </div>
            <div className='detail__cmt'>
              <FaRegComment size={23} />
              <span>{data.comments.length} Comments</span>
            </div>
          </div>
          <div className='post-item__save'>
            <BsBookmark size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
