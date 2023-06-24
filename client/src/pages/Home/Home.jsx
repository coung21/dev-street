import React, { useEffect, useState } from 'react';
import './Home.scss';
import LeftSidebar from '../../components/Sidebar/LeftSidebar/LeftSidebar';
import PostItem from '../../components/PostItem/PostItem';
import { getAllPost } from '../../api/postApi';
import api from '../../api/api'
function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getAllPostList() {
      const response = await getAllPost();
      setPosts([...response.data])
    }
    getAllPostList()
  }, []);
  return (
    <>
      <div className='home-layout'>
        <LeftSidebar />
        <div>
          {posts.map((item, i) => <PostItem key={i} data={item}/>)}
        </div>
        <div>a</div>
      </div>
    </>
  );
}

export default Home;
