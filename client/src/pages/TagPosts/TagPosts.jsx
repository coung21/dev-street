import React, { useEffect, useState } from "react";
import "./TagPosts.scss";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import SkeletonPostItem from "../../components/Skeleton/SkeletonPostItem";
import PostItem from "../../components/PostItem/PostItem";
import InfiniteScroll from "react-infinite-scroll-component";

function TagPosts() {
  const { tagname } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  function setColor(tags) {
    const tag = tags.find((tag) => tag.name === tagname);
    setTheme(tag ? tag.theme : "");
  }

  function fetchMoreData() {
    api
      .get(`/post/tags/${tagname}?page=${page}`)
      .then((res) => {
        setPosts((prevItems) => [...prevItems, ...res.data]);

        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    api
      .get(`/post/tags/${tagname}?page=${1}`)
      .then((response) =>
        setPosts((prevItems) => [...prevItems, ...response.data])
      )
      .then((response) => {
        if (response.data.length > 0) {
          setColor(response.data[0].tags);
        }
      })
      .then(() => setIsLoading(false));
  }, []);
  return (
    <div className="tag-page-layout">
      <div className="tag-page">
        <h2 className="tag-page__heading">
          Posts tagged with <i style={{ color: `${theme}` }}>#</i>
          {tagname}
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
                There are no posts matching this tag
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

export default TagPosts;
