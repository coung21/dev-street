import React from 'react';
import { useNavigate } from 'react-router-dom';

function Notification({ data }) {
  const navigate = useNavigate();
  function navigateToProfile(event) {
    event.stopPropagation();
    navigate(`/${data.sender._id}`);
  }
  function navigateToPost(event) {
    event.stopPropagation();
    navigate(`/${data.sender._id}/${data.post.url}`);
  }
  if (data.type === 'like' && data.post) {
    return (
      <div className='notification-body' onClick={navigateToPost}>
        <div className='notification__main'>
          <div className='notification__meta'>
            <img src={data.sender.avatar.url} alt='' onClick={navigateToProfile} />
            <h3>
              {data.sender.name || data.sender.username} just liked your post.
            </h3>
          </div>
          <i className='notification__date'>
            {new Date(data.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </i>
        </div>
        <i className='notification__content'>{data.post.title}</i>
      </div>
    );
  } else if (data.type === 'follow') {
    return (
      <div className='notification-body' onClick={navigateToProfile}>
        <div className='notification__main'>
          <div className='notification__meta'>
            <img src={data.sender.avatar.url} alt='' />
            <h3>
              {data.sender.name || data.sender.username} just followed you.
            </h3>
          </div>
          <i className='notification__date'>
            {new Date(data.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </i>
        </div>
      </div>
    );
  } else if (data.type === 'comment' && data.post) {
    return (
      <div className='notification-body' onClick={navigateToPost}>
        <div className='notification__main'>
          <div className='notification__meta'>
            <img src={data.sender.avatar} alt='' onClick={navigateToProfile} />
            <h3>
              {data.sender.name || data.sender.username} just commented your
              post
            </h3>
          </div>
          <i className='notification__date'>
            {new Date(data.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </i>
        </div>
        <i className='notification__content'>{data?.comment.body}</i>
      </div>
    );
  } else if (data.type === 'reply' && data.post) {
    return (
      <div className='notification-body' onClick={navigateToPost}>
        <div className='notification__main'>
          <div className='notification__meta'>
            <img src={data.sender.avatar.url} alt='' onClick={navigateToProfile} />
            <h3>
              {data.sender.name || data.sender.username} just replied your
              comment
            </h3>
          </div>
          <i className='notification__date'>
            {new Date(data.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </i>
        </div>
        <i className='notification__content'>{data?.comment.body}</i>
      </div>
    );
  } else if (data.type === "publish" && data.post){
    return (
      <div className='notification-body' onClick={navigateToPost}>
        <div className='notification__main'>
          <div className='notification__meta'>
            <img src={data.sender.avatar.url} alt='' onClick={navigateToProfile} />
            <h3>
              {data.sender.name || data.sender.username} you followed just published a new post.  
            </h3>
          </div>
          <i className='notification__date'>
            {new Date(data.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </i>
        </div>
      </div>
    );
  } else if(data.type === "schedule" && data.post){
    return (
      <div className='notification-body' onClick={navigateToPost}>
        <div className='notification__main'>
          <div className='notification__meta'>
            <img src={data.sender.avatar.url} alt='' />
            <h3>
              {data.sender.name || data.sender.username} he scheduled the post at 
            </h3>
          </div>
          <i className='notification__date'>
            {new Date(data.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </i>
        </div>
        <i className='notification__content'>{new Date(data.At).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                      })}</i>
      </div>
    );
  }
}

export default Notification;
