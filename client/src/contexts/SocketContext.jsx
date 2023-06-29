import React, {createContext, useEffect, useState} from 'react';
import io from 'socket.io-client';
import {useSelector} from 'react-redux'

export const SocketContext = createContext();


function SocketProvider({children}) {
  const { current_user } = useSelector((state) => state.auth);
  const [socket, setSocket]= useState(null)
  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_SERVER_DOMAIN}`, {withCredentials: true})
    setSocket(newSocket)
    if(current_user !== null){
      newSocket.connect()
    } else {
      newSocket.disconnect()
    }
    return () => {
      newSocket.disconnect()
    }
  }, [current_user])
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider;