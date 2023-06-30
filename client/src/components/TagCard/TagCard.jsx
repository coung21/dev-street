import React from 'react'
import './TagCard.scss'
import { Link, useNavigate } from 'react-router-dom'

function TagCard({data}) {
  const navigate = useNavigate()
  function navigateTagPosts(){
    navigate(`/tags/${data.name}`);
  }
  return (
    <div className='tag-item' style={{ borderTop: `1rem solid ${data.theme}` }} onClick={navigateTagPosts}>
      <h2>
        <Link className='tag-title'>
          <span style={{ color: `${data.theme}` }}>#</span>
          {data.name}
        </Link>
      </h2>
      <p>{data.posts.length} posts published</p>
      <div>
        <button>Follow</button>
      </div>
    </div>
  );
}

export default TagCard