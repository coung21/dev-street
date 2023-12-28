import React, {useEffect, useState} from 'react'
import './Notifications.scss';
import Notification from '../../components/Notification/Notification';
import { getNotification } from '../../api/userApi';
import {useSelector} from 'react-redux'
import api from '../../api/api';

function Notifications() {
  const [notifications, setNotifications] = useState([])
  const { current_user } = useSelector((state) => state.auth);

  useEffect(() => {
    async function getAllNotification(){
      const response = await api.get(`/user/${current_user._id}/notifications`)
        setNotifications(response.data)
        console.log(response.data)
      }
    getAllNotification()
  }, [])
  return (
    <div className='notifications-layout'>
      <div className='notifications-page'>
        <h3>Notifications</h3>
        {notifications.length >= 1 ? (
          notifications.map((item, i) => <Notification key={i} data={item} />)
        ) : (
          <h2 style={{ color: '#6c6c6c' }}>
            You don't have any notifications
          </h2>
        )}
      </div>
    </div>
  );
}

export default Notifications