import React from 'react'
import './Comment.scss'
import CommentForm from './CommentForm';
import Comment from './Comment';
function Comments() {
  return (
    <section id='comments'>
      <h2>Top Comments {'(26)'}</h2>
      <CommentForm />
      <Comment />
    </section>
  )
}

export default Comments