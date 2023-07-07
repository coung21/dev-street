import React, {useState, useEffect} from 'react'
import './UserProfile.scss'
import { useParams } from 'react-router-dom'
import api from '../../api/api'
import ProfileCard from '../../components/Profile/ProfileCard';
import ProfileFeeds from '../../components/Profile/ProfileFeeds';

function UserProfile() {
  let {userid} = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    document.getElementsByClassName('layout')[0].style.padding = '0px'
    async function fetchUser(){
      const response = await api.get(`/user/${userid}`)
      setUser(response.data)
      console.log(response.data)
    }
    fetchUser()
  }, [])

  return (
    <div className='brand-bg'>
      <div className='profile-layout'>
        <ProfileCard data={user}/>
        <ProfileFeeds data={user}/>
      </div>
    </div>
  );
}

export default UserProfile