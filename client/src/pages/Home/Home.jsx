import React, { useEffect, useState } from 'react';
import './Home.scss';
import LeftSidebar from '../../components/Sidebar/LeftSidebar/LeftSidebar';
import PostItem from '../../components/PostItem/PostItem';
import { getAllPost } from '../../api/postApi';
import SkeletonPostItem from '../../components/Skeleton/SkeletonPostItem';
import About from '../../components/About/About';
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
        <div>
          <About />
        </div>
      </div>
    </>
  );
}

export default Home;
