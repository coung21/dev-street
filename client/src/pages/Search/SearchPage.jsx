import React, { useState, useEffect } from 'react';
import './SearchPage.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchResult } from '../../api/postApi';
import SkeletonPostItem from '../../components/Skeleton/SkeletonPostItem';
import PostItem from '../../components/PostItem/PostItem';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchSearch() {
      setIsLoading(true);
      const response = await getSearchResult(searchParams.get('search'));
      setPosts([...response.data]);
      setIsLoading(false);
    }
    fetchSearch();
  }, [searchParams.get('search')]);
  return (
    <div className='search-page-layout'>
      <div className='search-page'>
        <h2 className='search-page__heading'>
          Results for "{searchParams.get('search')}"
        </h2>
        {isLoading ? (
          Array(10)
            .fill()
            .map((_, i) => <SkeletonPostItem key={i} />)
        ) : (
          <div>
            {posts.length === 0 && (
              <div
                className='card'
                style={{
                  minHeight: '150px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                No results match that query
              </div>
            )}
            {posts.map((item, i) => (
              <PostItem key={i} index={i} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
