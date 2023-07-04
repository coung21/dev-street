import React, { useState, useEffect } from 'react';
import './ReadingList.scss';
import { useSelector } from 'react-redux';
import { getReadingList } from '../../api/userApi';
import SkeletonPostItem from '../../components/Skeleton/SkeletonPostItem';
import PostItem from '../../components/PostItem/PostItem';

function ReadingList() {
  const { current_user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getUserReadingList() {
      setIsLoading(true);
      const response = await getReadingList(current_user?._id);
      setPosts([...response.data]);
      setIsLoading(false);
    }
    getUserReadingList();
  }, []);
  return (
    <div className='readinglist-page-layout'>
      <div className='readinglist-page'>
        <h2 className='readinglist-page__heading'>
          Reading List {`(${posts.length})`}
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

export default ReadingList;
