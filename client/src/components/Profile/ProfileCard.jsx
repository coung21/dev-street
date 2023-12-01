import React, { useState } from 'react';
import {
  HiOutlineCake,
  HiLocationMarker,
  HiExternalLink,
} from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FollowButton from '../Follow/FollowButton';
import FollowingButton from '../Follow/FollowingButton';

function ProfileCard({ data }) {
  if (!data) {
    return <></>;
  }
  const { current_user } = useSelector((state) => state.auth);
  const [isFollow, setIsFollow] = useState(
    data.followers?.includes(current_user?._id)
  );
  return (
    <div className='profile-card'>
      <div className='profile-card__top'>
        <span
          className='profile-avatar'
          style={{ backgroundColor: `${data.theme}` }}
        >
          <img src={data.avatar.url} alt='' />
        </span>
        {/* tính năng follow & edit */}
        <div className='profile-actions'>
          {current_user?._id === data?._id ? (
            <Link to={`/user/${data?._id}/settings`}>
              <button className='users-btn'>Edit Profile</button>
            </Link>
          ) : (
            <>
              {isFollow ? (
                <FollowingButton
                  setIsFollow={setIsFollow}
                  follower={current_user}
                  user={data}
                />
              ) : (
                <FollowButton
                  setIsFollow={setIsFollow}
                  follower={current_user}
                  user={data}
                />
              )}
            </>
          )}
        </div>
      </div>
      <div className='profile-card__details'>
        <h1>{data.name || data.username}</h1>
        <p className='profile-bio'>
          {!data.bio ? '404 bio not found' : data.bio}
        </p>
        <div className='profile-meta'>
          {data.location && (
            <span className='profile-meta__item'>
              <HiLocationMarker size={24} />
              <p>{data.location}</p>
            </span>
          )}
          <span className='profile-meta__item'>
            <HiOutlineCake size={24} />
            <p>
              Joined on{' '}
              {new Date(data.joinDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </span>
          {data.links && (
            <span className='profile-meta__item'>
              <HiExternalLink size={24} />
              <a href={data.links}>{data.links}</a>
            </span>
          )}
        </div>
      </div>

      <div className='profile-card__bottom'>
        {data.work && (
          <div className='definition'>
            <h5>Work</h5>
            <p>{data.work}</p>
          </div>
        )}
        {data.education && (
          <div className='definition'>
            <h5>Education</h5>
            <p>{data.education}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
