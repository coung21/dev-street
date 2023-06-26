import React from 'react';
import SkeletonElement from './SkeletonElement';
import './Skeleton.scss';
import Shimmer from './Shimmer';

const SkeletonArticle = ({ type }) => {
  return (
    <div className='skeleton-wrapper'>
      <div className='skeleton-article'>
        <SkeletonElement />
        <SkeletonElement type='title' />
        <SkeletonElement type='text' />
        <SkeletonElement type='text' />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonArticle;
