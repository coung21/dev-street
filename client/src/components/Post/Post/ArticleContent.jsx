import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlight from '../../SyntaxHighlight/SyntaxHighlight';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import SkeletonArticle from '../../Skeleton/SkeletonArticle';
import { useSelector, useDispatch } from 'react-redux';
import ConfirmModal from '../../Modal/ConfirmModal';
import Comments from '../../Comment/Comments';


function ArticleContent({ data }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { current_user } = useSelector((state) => state.auth);
  function openConfirmDelete(){
    document.getElementById('confirm-backdrop').style.display = 'flex';
  }
  if (!data) {
    return (
      <>
        <main className='article__content'>
          <SkeletonArticle />
        </main>
      </>
    );
  }
  return (
    <div>
      <main className='article__content'>
        <article>
          <header className='article__header'>
            <div className='article__cover'>
              <img src={data.image} alt='' />
            </div>
            <div className='article__header__meta'>
              <div className='article__header__author-wrapper'>
                <div className='article__header__author'>
                  <div className='article__header__author-pic'>
                    <img
                      src={data.author.avatar}
                      alt=''
                      style={{ width: '40px', height: '40px' }}
                    />
                  </div>
                  <div>
                    <Link>{data.author.username}</Link>
                    <div className='meta__time'>
                      Posted on{' '}
                      {new Date(data.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
                {data.author._id === current_user?._id && (
                  <div className='post-actions'>
                    <Link to={location.pathname + '/edit'}>
                      <button className='edit-post'>Edit</button>
                    </Link>
                    <button onClick={openConfirmDelete} className='delete-post'>
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <h1 className='article__title'>{data.title}</h1>
              <div className='article__tags'>
                {data.tags.map((item, i) => (
                  <Link key={i}>
                    <span style={{ color: `${item.theme}` }}>#</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </header>
          <div className='article__main'>
            <ReactMarkdown
              remarkPlugins={[gfm]}
              rehypePlugins={[rehypeRaw]}
              components={SyntaxHighlight}
              escapeHtml={false}
            >
              {data.body}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      <Comments postId={data._id} postOwner={data.author}/>
      <ConfirmModal userId={current_user?._id} postId={data?._id} />
    </div>
  );
}

export default ArticleContent;
