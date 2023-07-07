import React from 'react';
import { FaRegNewspaper, FaRegComments, FaHashtag } from 'react-icons/fa';
import PostItem from '../PostItem/PostItem';

function ProfileFeeds({ data }) {
  if(!data) return <p>Loading..</p>
  return (
    <div className='feeds-layout'>
      <div className='profile-sidebar'>
        {data.skills && (
          <div className='profile-skills'>
            <div className='skills__header'>Skills</div>
            <div className='skills__body'>
              <p>{data.skills}</p>
            </div>
          </div>
        )}
        <div className='profile-card-2'>
          <span>
            <FaRegNewspaper size={20} />{' '}
            <p>{data.posts?.length} posts published</p>
          </span>
          <span>
            <FaRegComments size={20} />{' '}
            <p>{data.comments?.length} comments written</p>
          </span>
          <span>
            <FaHashtag size={20} />{' '}
            <p>{data.followedTags?.length} tags followed</p>
          </span>
        </div>
      </div>
      <div className='feeds'>
        {data.posts?.map((item, i) => (
          <PostItem data={item} index={i} />
        ))} 
      </div>
    </div>
  );
}

export default ProfileFeeds;
