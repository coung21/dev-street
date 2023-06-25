import React from 'react'
import './TagCard.scss'
import { Link } from 'react-router-dom'

function TagCard({data}) {
  return (
    <div className='tag-item' style={{borderTop: `1rem solid ${data.theme}`}}>
      <h2>
        <Link className='tag-title' to={`/tag/${data._id}`}>
          <span style={{color: `${data.theme}`}}>#</span>
          {data.name}
        </Link>
      </h2>
      <p>{data.posts.length} posts published</p>
      <div>
        <button>Follow</button>
      </div>
    </div>
  )
}

export default TagCard