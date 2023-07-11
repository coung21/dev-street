import React, { useContext } from 'react'
import { SocketContext } from '../../contexts/SocketContext'
import './FollowBtn.scss'
import {followUser} from '../../api/userApi'
import { useSelector } from 'react-redux';


function FollowButton({setIsFollow, follower, user}) {
  const socket = useContext(SocketContext)
  const { current_user } = useSelector((state) => state.auth);
  async function followHandler(){
    if (!current_user) {
      return console.log('Chưa đăng nhập');
    }
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