import React, {useState, useEffect} from 'react';
import '../../../pages/Post/Post.scss';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import ReactMarkdown from 'react-markdown'
import SyntaxHighlight from '../../SyntaxHighlight/SyntaxHighlight'
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import SkeletonArticle from '../../Skeleton/SkeletonArticle';

function ArticleContent({data}) {
  const [loading, setloading] = useState(true)
  if(!data){
    return <>
     <main className='article__content'>
      <SkeletonArticle />
     </main>
    </>
  }
  return (
    <main className='article__content'>
      <article>
        <header className='article__header'>
          <div className='article__cover'>
            <img src={data.image} alt='' />
          </div>
          <div className='article__header__meta'>
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
            <div className='article__reactions'>
              <AiFillHeart size={25} style={{ color: '#e74559' }} />
              &#160;
              {data.likes.length} likes
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
  );
}

export default ArticleContent;
