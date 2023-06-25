import React, {useEffect, useState} from 'react'
import './Tags.scss'
import TagCard from '../../components/TagCard/TagCard';
import api from '../../api/api'

function Tags() {
  const [tags, setTags] = useState([])
  useEffect(() => {
    async function getAllTags(){
      try {
        const response = await api.get('/tag')
        setTags([...response.data])
      } catch (error) {
        console.log(error)
      }
    }
    getAllTags()
  }, [])

  return (
    <>
      <div className='tags-layout'>
        {tags.map((item, i) => (
          <TagCard data={item} key={i}/>
          // console.log(item)
        ))}
      </div>
    </>
  );
}

export default Tags