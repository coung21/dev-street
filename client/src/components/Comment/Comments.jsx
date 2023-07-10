import React, { useState, useEffect } from 'react';
import './Comment.scss';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { getComments } from '../../api/postApi';
function Comments({ postId, postOwner }) {
  if (!postId) return <div></div>;

  const [comments, setComments] = useState([]);
  const [rootComments, setRootComments] = useState([]);
  const [newComment, setNewComment] = useState(null)

  useEffect(() => {
    async function fetchComments() {
      const response = await getComments(postId);
      setComments(response.data);
      setRootComments(
        response.data.filter((comment) => comment.parentId === null).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      );
    }
    fetchComments();
  }, [newComment]);

  return (
    <section id='comments'>
      <h2>Top Comments {`(${comments.length})`}</h2>
      <CommentForm postId={postId} postOwner={postOwner} setNewComment={setNewComment}/>
      {rootComments.map((comment) => (
        <Comment
          key={comment._id}
          data={comment}
          child={comments.filter((rep) => rep.parentId === comment._id)}
          comments={comments}
          setNewComment={setNewComment}
          postOwner={postOwner}
          postId={postId}
        />
      ))}
    </section>
  );
}

export default Comments;
