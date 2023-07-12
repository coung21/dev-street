import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { getFollowTags } from '../../api/tagApi'

function FollowingTag() {
  const [tags, setTags] = useState([])
    const {current_user} = useSelector(state => state.auth)

  useEffect(() => {
    async function fetchFollowTag(){
      const response = await getFollowTags(current_user?._id)
      setTags(response.data)
    }
    fetchFollowTag()
  }, [])
  return (
    <div>
      <h3 className='subtitle'>My Tags</h3>
      <div className='follow-tag__container'>
        {tags.map((tag) => (
          <div className='follow-tag__item'>
            <Link to={`/tags/${tag.name}`}>#{tag.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FollowingTag