import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Comment.scss';
import { BsReply } from 'react-icons/bs';
import { BiExpandVertical } from 'react-icons/bi';
import CommentForm from './CommentForm';

function Comment({ data, child, comments, setNewComment, postId, postOwner }) {
  const [activeReply, setActiveReply] = useState(false);
  const [expand, setExpand] = useState(false);
  return (
    <>
      <div className='comment__container'>
        <div className='comment'>
          <span className='comment__avatar'>
            <img src={data.author.avatar} alt='' />
            {child?.length > 0 && (
              <i onClick={() => setExpand((prev) => !prev)}>
                <BiExpandVertical />
              </i>
            )}
          </span>
          <div className='comment__body'>
            <div className='comment__inner'>
              <header>
                <Link>{data.author.name || data.author.username}</Link>
                <p>
                  {' '}
                  {new Date(data.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </header>
              <div className='comment__content'>{data.body}</div>
            </div>
            {!activeReply && (
              <div className='comment__footer'>
                <button onClick={() => setActiveReply(true)}>
                  <BsReply size={16} /> Reply
                </button>
              </div>
            )}
          </div>
        </div>
        {/* reply form */}
        {activeReply && (
          <CommentForm
            activeReply={activeReply}
            setActiveReply={setActiveReply}
            setNewComment={setNewComment}
            parentId={data._id}
            postId={postId}
            postOwner={postOwner}
            commentOwner={data.author}
          />
        )}
        {/* replies */}
        {child?.length > 0 &&
          expand &&
          child.map((comment) => (
            <Comment
              key={comment._id}
              data={comment}
              child={comments?.filter((rep) => rep.parentId === comment._id)}
              setNewComment={setNewComment}
              postOwner={postOwner}
              postId={postId}
            />
          ))}
      </div>
    </>
  );
}

export default Comment;
