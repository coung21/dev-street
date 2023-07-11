import React, { useState } from 'react';
import './TagCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UIActions } from '../../store/slices/UiSlice';
import { followTag, unFollowTag } from '../../api/tagApi';

function TagCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { current_user } = useSelector((state) => state.auth);
  const [isFollow, setIsFollow] = useState(
    data.followers.includes(current_user?._id)
  );

  function navigateTagPosts(event) {
    event.stopPropagation();
    navigate(`/tags/${data.name}`);
  }
  async function followingTag(event) {
    event.stopPropagation();
    if(!current_user){
      return dispatch(UIActions.toggleAuthModal(true));
    }
    setIsFollow(true);
    await followTag(data._id, current_user._id)
  }

  async function unFollowingTag(event) {
    event.stopPropagation();
    if (!current_user) {
      return dispatch(UIActions.toggleAuthModal(true));
    }
    setIsFollow(false);
    unFollowTag(data._id, current_user._id)
  }
  return (
    <div
      className='tag-item'
      style={{ borderTop: `1rem solid ${data.theme}` }}
      onClick={navigateTagPosts}
    >
      <h2>
        <Link className='tag-title'>
          <span style={{ color: `${data.theme}` }}>#</span>
          {data.name}
        </Link>
      </h2>
      <p>{data.posts.length} posts published</p>
      <div>
        {isFollow ? (
          <button onClick={unFollowingTag}>Following</button>
        ) : (
          <button onClick={followingTag}>Follow</button>
        )}
      </div>
    </div>
  );
}

export default TagCard;
