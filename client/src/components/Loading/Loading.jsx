import React from 'react'
import './Loading.scss'

function Loading() {
  return (
    <div className='loader-container'>
    <div className='loader'>
      <div className='circle'></div>
      <div className='circle'></div>
      <div className='circle'></div>
      <div className='circle'></div>
    </div>
    </div>
  );
}

export default Loading