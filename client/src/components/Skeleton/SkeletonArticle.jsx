import React from 'react';
import SkeletonElement from './SkeletonElement';
import './Skeleton.scss';
import Shimmer from './Shimmer';

function SkeletonArticle() {
  return (
    <div className='skeleton--wrapper'>
      <div className='skeleton--article'>
        <SkeletonElement type={'thumbnail'} />
        <div style={{ padding: '0 3rem' }}>
          <SkeletonElement type={'title'} />
          <SkeletonElement type={'text'} />
          <SkeletonElement type={'text'} />
          <br />
          <SkeletonElement type={'span'} />
          <SkeletonElement type={'text'} />
          <br />
          <br />
          <SkeletonElement type={'text'} />
          <SkeletonElement type={'span'} />
          <br />
          <SkeletonElement type={'span'} />
          <SkeletonElement type={'text'} />
          <br />
          <br />
          <SkeletonElement type={'text'} />
        </div>
      </div>
      <Shimmer />
    </div>
  );
}

export default SkeletonArticle;
