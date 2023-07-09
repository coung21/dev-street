import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Comment.scss'
import {BsReply} from 'react-icons/bs'
import CommentForm from './CommentForm';

function Comment() {
  const [activeReply, setActiveReply] = useState(false)
  return (
    <div className='comment'>
      <img
        src='https://res.cloudinary.com/practicaldev/image/fetch/s--K-RXEJQK--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1074355/bea4226a-074c-4527-a830-180802033a92.jpeg'
        alt=''
      />
      <div className='comment__body'>
        <div className='comment__inner'>
          <header>
            <Link>Stephen</Link>
            <p>Jul 1</p>
          </header>
          <div className='comment__content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            reiciendis quia consequatur in laboriosam! Unde placeat magni odit.
            Exercitationem velit autem, soluta placeat esse ullam libero amet
            quis excepturi iure.
          </div>
        </div>
        {activeReply ? (
          <CommentForm activeReply={activeReply} setActiveReply={setActiveReply}/>
        ) : (
          <div className='comment__footer'>
            <button onClick={() => setActiveReply(true)}>
              <BsReply size={16} /> Reply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment