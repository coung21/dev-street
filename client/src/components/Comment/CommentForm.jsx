import React, { useState } from 'react';

function CommentForm({ activeReply = false, setActiveReply }) {
  const [text, setText] = useState('');
  function inputHandler(event) {
    setText(event.target.value);
  }
  return (
    <div className='comment-form__container'>
      <div className='comment-form'>
        <img
          src='https://res.cloudinary.com/practicaldev/image/fetch/s--K-RXEJQK--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1074355/bea4226a-074c-4527-a830-180802033a92.jpeg'
          alt=''
        />
        <textarea
          name='comment'
          placeholder='Add to the discussion'
          value={text}
          onChange={inputHandler}
        />
      </div>
      {text.length > 0 && (
        <>
          <button className='comment-btn'>Submit</button>
          <button onClick={activeReply ? () => setActiveReply(false) : () => setText('')} className="dismiss-btn">Dismiss</button>
        </>
      )}
    </div>
  );
}

export default CommentForm;
