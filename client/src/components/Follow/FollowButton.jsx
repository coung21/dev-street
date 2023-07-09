import React, { useContext } from 'react'
import { SocketContext } from '../../contexts/SocketContext'
import './FollowBtn.scss'
import {followUser} from '../../api/userApi'

function FollowButton({setIsFollow, follower, user}) {
  const socket = useContext(SocketContext)
  async function followHandler(){
    if(follower && socket &&  follower._id !== user._id){
      setIsFollow(true)
      socket.emit('follow', {
        sender: { id: follower?._id, username: follower?.username },
        receiver: { id: user?._id, username: user?.username },
      });
      await followUser(user._id, follower._id)
    }
  }
  return (
    <button onClick={followHandler} className='follow-btn'>Follow</button>
  )
}

export default FollowButton