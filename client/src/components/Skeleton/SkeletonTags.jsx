import React from 'react'
import './Skeleton.scss'
import SkeletonElement from './SkeletonElement';
function SkeletonTags() {
  return (
    <>
      {Array(10)
        .fill()
        .map((_, i) => (
          <div className='skeleton__tag-item' key={i}>
            {Array(4)
        .fill()
        .map((_, i) => <SkeletonElement type={'text'} key={i}/>)}
          </div>
        ))}
    </>
  );
}

export default SkeletonTags