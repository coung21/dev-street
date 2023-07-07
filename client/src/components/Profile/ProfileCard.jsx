import React from 'react';
import {
  HiOutlineCake,
  HiLocationMarker,
  HiExternalLink,
} from 'react-icons/hi';

function ProfileCard({ data }) {
  if (!data) {
    return <p>Loading..</p>;
  }
  return (
    <div className='profile-card'>
      <div className='profile-card__top'>
        <span className='profile-avatar'>
          <img src={data.avatar} alt='' />
        </span>
        <div className='profile-actions'>
          <button className='users-btn'>Edit Profile</button>
        </div>
      </div>
      <div className='profile-card__details'>
        <h1>{data.name || data.username}</h1>
        <p className='profile-bio'>{data.bio}</p>
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
              Joined on {' '}
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
      {data.education ||
        (data.work && (
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
        ))}
    </div>
  );
}

export default ProfileCard;
