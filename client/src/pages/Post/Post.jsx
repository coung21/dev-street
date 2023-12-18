import React, {useEffect, useState} from 'react'
import './Post.scss'
import { useParams, useLocation } from 'react-router-dom';
import { getPostDetail } from '../../api/postApi';
import ArticleContent from '../../components/Post/Post/ArticleContent';
import ArticleLeft from '../../components/Post/Post/ArticleLeft';
import ArticleRight from '../../components/Post/Post/ArticleRight';
import {Helmet} from "react-helmet"


function Post() {
  const {slug} = useParams()
  const [post, setPost] = useState(null)
  const location = useLocation()
  useEffect(() => {
    async function getDetail(){
      try {
        const response = await getPostDetail(slug);
        setPost(response.data)
        document.title = response.data.title
      } catch (error) {
        console.log(error)
      }
    }
    getDetail()

    return () => {
      document.title = "Dev Street"
    }
  }, [location.pathname])
  return (
    <div className='article-layout'>
      {/* <Helmet>
        <meta property="og:title" content={post.title} />
        <meta property="og:image" content={post.} />
      </Helmet> */}
      <ArticleLeft data={post}/>
      <ArticleContent data={post} />
      <ArticleRight data={post?.author}/>
      <div></div>
    </div>
  );
}

export default Post