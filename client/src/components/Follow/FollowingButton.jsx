import React, { useContext } from 'react';
import { SocketContext } from '../../contexts/SocketContext';
import './FollowBtn.scss';
import { unFollowUser } from '../../api/userApi';

function FollowingButton({ setIsFollow, follower, user }) {
  const socket = useContext(SocketContext);
  async function unFollowHandler() {
    if (follower && socket && follower._id !== user._id) {
      setIsFollow(false);
      await unFollowUser(user._id, follower._id)
    }
  }
  return <button onClick={unFollowHandler} className='following-btn'>Following</button>;
}

export default FollowingButton;
