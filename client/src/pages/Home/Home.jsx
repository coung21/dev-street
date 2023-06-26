import React, { useEffect, useState } from 'react';
import './Home.scss';
import LeftSidebar from '../../components/Sidebar/LeftSidebar/LeftSidebar';
import PostItem from '../../components/PostItem/PostItem';
import { getAllPost } from '../../api/postApi';
import api from '../../api/api'
import SkeletonArticle from '../../components/Skeleton/SkeletonArticle';
function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    async function getAllPostList() {
      setIsLoading(true)
      const response = await getAllPost();
      setPosts([...response.data])
      setIsLoading(false)
    }
    getAllPostList()
  }, []);
  return (
    <>
      <div className='home-layout'>
        <LeftSidebar />
        <div>
          {isLoading ? (
            Array(10).fill().map((_, i) => <SkeletonArticle key={i} />)
          ) : (
            <div>
              {posts.map((item, i) => (
                <PostItem key={i} index={i} data={item} />
              ))}
            </div>
          )}
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Home;
