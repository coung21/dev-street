import React, {useEffect, useState} from 'react'
import './TagPosts.scss'
import {useParams} from 'react-router-dom'
import { getPostsByTag } from '../../api/postApi'
import SkeletonPostItem from '../../components/Skeleton/SkeletonPostItem'
import PostItem from '../../components/PostItem/PostItem'
function TagPosts() {
  const { tagname } = useParams()
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('')
  
  function setColor(tags){
    const tag = tags.find(tag => tag.name === tagname)
    setTheme(tag ? tag.theme : '')
  }

useEffect(() => {
async function getAllPostByTag() {
  setIsLoading(true);
  const response = await getPostsByTag(tagname);
  setColor(response.data[0].tags)
  setPosts([...response.data]);
  setIsLoading(false);
}
getAllPostByTag();
  }, [])
  return (
    <div className='tag-page-layout'>
    <div className='tag-page'>
      <h2 className='tag-page__heading'>
        Posts tagged with <i style={{color: `${theme}`}}>#</i>
        {tagname}
      </h2>
      {isLoading ? (
        Array(10)
          .fill()
          .map((_, i) => <SkeletonPostItem key={i} />)
      ) : (
        <div>
          {posts.map((item, i) => (
            <PostItem key={i} index={i} data={item} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default TagPosts