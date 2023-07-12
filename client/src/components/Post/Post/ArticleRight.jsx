import React from 'react';
import { Link } from 'react-router-dom'

function ArticleRight({ data }) {
  if (!data) return <></>;
  return (
    <div>
      <Link to={`/${data?._id}`} className='card-visit' style={{borderTopColor: `${data.theme}`}}>
        <div className='card-visit__meta'>
          <img src={data.avatar} alt='' />
          <h2>{data.name || data.username}</h2>
        </div>
        <p>{data.bio || '404 bio not found'}</p>
        <ul>
          <li>
            <div className='key'>Location</div>
            <div className='value'>{data.location || 'none'}</div>
          </li>
          <li>
            <div className='key'>Work</div>
            <div className='value'>{data.work || 'none'}</div>
          </li>
          <li>
            <div className='key'>Joined</div>
            <div className='value'>
              {new Date(data.joinDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </li>
        </ul>
      </Link>
    </div>
  );
}

export default ArticleRight;
