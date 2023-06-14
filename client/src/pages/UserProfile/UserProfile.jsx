import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/api'

function UserProfile() {
  let {userid} = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    async function fetchUser(){
      const response = await api.get(`/user/${userid}`)
      setUser(response.data)
    }
    fetchUser()
  }, [])

  return (
    <div>
      {user.username}, {user.email},{' '}
      {new Date(user.joinDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
    </div>
  );
}

export default UserProfile