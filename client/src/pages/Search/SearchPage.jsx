import React, { useState, useEffect } from "react";
import "./SearchPage.scss";
import { useSearchParams } from "react-router-dom";
import api from "../../api/api";
import SkeletonPostItem from "../../components/Skeleton/SkeletonPostItem";
import PostItem from "../../components/PostItem/PostItem";
import InfiniteScroll from "react-infinite-scroll-component";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  function fetchMoreData() {
    api
      .get(`/search?search=${searchParams.get("search")}&page=${page}`)
      .then((res) => {
        setPosts((prevItems) => [...prevItems, ...res.data]);

        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/search?search=${searchParams.get("search")}&page=${1}`)
      .then((response) =>
      {

        console.log(response)
          setPosts((prevItems) => [...prevItems, ...response.data])
      }
      )
      .then(() => setIsLoading(false));
  }, [searchParams.get("search")]);
  return (
    <div className="search-page-layout">
      <div className="search-page">
        <h2 className="search-page__heading">
          Results for "{searchParams.get("search")}"
        </h2>
        {isLoading ? (
          Array(10)
            .fill()
            .map((_, i) => <SkeletonPostItem key={i} />)
        ) : (
          <InfiniteScroll
            dataLength={posts.length}
            hasMore={hasMore}
            next={fetchMoreData}
            loader={<SkeletonPostItem />}
          >
            {posts.length === 0 && (
              <div
                className="card"
                style={{
                  minHeight: "150px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No results match that query
              </div>
            )}
            {posts.map((item, i) => (
              <PostItem key={i} index={i} data={item} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
