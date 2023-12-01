import React, { useState, useEffect } from 'react';
import './UserProfile.scss';
import { useParams, useLocation } from 'react-router-dom';
import { getUserProfile } from '../../api/userApi';
import ProfileCard from '../../components/Profile/ProfileCard';
import ProfileFeeds from '../../components/Profile/ProfileFeeds';
import SkeletonArticle from '../../components/Skeleton/SkeletonArticle';

function UserProfile() {
  let { userid } = useParams();
  const [user, setUser] = useState(null);
  const location = useLocation();
  useEffect(() => {
    // document.getElementsByClassName('layout')[0].style.padding = '0px';
    async function fetchUser() {
      const response = await getUserProfile(userid);
      setUser(response.data);
      console.log(response.data)
    }
    fetchUser();
    // return () => {
    //   document.getElementsByClassName('layout')[0].style.padding = '1rem';
    // };
  }, [location.pathname]);

  if (!user) {
    return (
      <div style={{ width: '100%' }}>
        <SkeletonArticle />
      </div>
    );
  }
  return (
    <div
      className='brand-bg'
      style={{
        background: `linear-gradient(to bottom, ${user?.theme} 8rem, transparent 8rem)`,
      }}
    >
      <div className='profile-layout'>
        <ProfileCard data={user} />
        <ProfileFeeds data={user} />
      </div>
    </div>
  );
}

export default UserProfile;
