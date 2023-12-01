import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component'
import "./Home.scss";
import LeftSidebar from "../../components/Sidebar/LeftSidebar/LeftSidebar";
import PostItem from "../../components/PostItem/PostItem";
import api from "../../api/api";
import SkeletonPostItem from "../../components/Skeleton/SkeletonPostItem";
import About from "../../components/About/About";
function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

 

   function fetchMoreData () {
    
    api
    .get(`/post?page=${page}`)
    .then((res) => {
      setPosts((prevItems) => [...prevItems, ...res.data]);

      res.data.length > 0 ? setHasMore(true) : setHasMore(false);
    })
    .catch((err) => console.log(err));

    setPage((prev) => prev + 1);

  }


  useEffect(() => {
    setIsLoading(true);
    api.get(`/post?page=${1}`).then((response) => setPosts((prevItems) => [...prevItems, ...response.data]))
    .then(() => setIsLoading(false))
  }, []);
  return (
    <>
      <div className="home-layout">
        <LeftSidebar />
        <InfiniteScroll
        dataLength={posts.length}
        hasMore={hasMore}
        next={fetchMoreData}
        loader={<SkeletonPostItem/>}
        >
          {isLoading ? (
            Array(10)
              .fill()
              .map((_, i) => <SkeletonPostItem key={i} />)
          ) : (
            <>
              {posts.map((item, i) => (
                <PostItem key={i} index={i} data={item} />
              ))}
            </>
          )}
        </InfiniteScroll>
        {/* right */}
        <div>
          <About />
        </div>
      </div>
    </>
  );
}

export default Home;
