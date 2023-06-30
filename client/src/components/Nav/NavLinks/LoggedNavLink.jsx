import React, {useCallback, useContext , useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../Nav.scss';
import { BiBell } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { UIActions } from '../../../store/slices/UiSlice';
import { SocketContext } from '../../../contexts/SocketContext';
import audio from '../../../assets/audio/notification.mp3';

const notificationAudio = new Audio(audio);

function LoggedNavLink({ user }) {
  const socket = useContext(SocketContext)
  const [unreadNotifications, setUnreadNotifications] = useState([])
  const dispatch = useDispatch();
  const {dropdown} = useSelector((state) => state.Ui);
  const {current_user} = useSelector((state) => state.auth);
  const handleToggleDropdown = useCallback(() => {
    dispatch(UIActions.toggleDropdown(!dropdown));
  }, [dispatch, dropdown]);

  function navigateNotification(){
    socket.emit('clearNotification', {sender: {id: current_user?._id}})
    setUnreadNotifications([])
  }
  useEffect(() => {
    if(current_user && socket){
      socket.on('notification', (data) => {
        notificationAudio.play()
        setUnreadNotifications((prevState => [...prevState, data]))
      });
    }
  }, [current_user, socket])
  return (
    <>
      <Link to={'/new'}>
        <button className='btn create-post btn--primary'>Create Post</button>
      </Link>
      <Link>
        <button className='btn--notification' onClick={navigateNotification}>
          <BiBell size={25} />
          {/* counter */}
          {unreadNotifications && unreadNotifications.length > 0 && 
              <span className='nofi-counter'>{unreadNotifications.length}</span>
            }
        </button>
      </Link>
      <button className='btn--profile' onClick={handleToggleDropdown}>
        <img id='profileRef' src={user.avatar} alt='' />
      </button>
    </>
  );
}

export default LoggedNavLink;
