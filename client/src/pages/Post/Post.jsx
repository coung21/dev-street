import React, {useEffect, useState} from 'react'
import './Post.scss'
import { useParams, useLocation } from 'react-router-dom';
import { getPostDetail } from '../../api/postApi';
import ArticleContent from '../../components/Post/Post/ArticleContent';
import ArticleLeft from '../../components/Post/Post/ArticleLeft';


function Post() {
  const {slug} = useParams()
  const [post, setPost] = useState(null)
  const location = useLocation()
  useEffect(() => {
    async function getDetail(){
      try {
        const response = await getPostDetail(slug);
        setPost(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getDetail()
  }, [location.pathname])
  return (
    <div className='article-layout'>
      <ArticleLeft data={post}/>
      <ArticleContent data={post} />
      <div></div>
    </div>
  );
}

export default Post