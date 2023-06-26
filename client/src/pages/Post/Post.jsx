import React, {useEffect, useState} from 'react'
import './Post.scss'
import { useParams } from 'react-router-dom';
import { getPostDetail } from '../../api/postApi';
import ArticleContent from '../../components/Post/Post/ArticleContent';


function Post() {
  const {slug} = useParams()
  const [post, setPost] = useState(null)
  useEffect(() => {
    async function getDetail(){
      try {
        const response = await getPostDetail(slug);
        setPost(response.data)
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      }
    }
    getDetail()
  }, [])
  return (
    <div className='article-layout'>
      <div></div>
      <ArticleContent data={post} />
      <div></div>
    </div>
  );
}

export default Post