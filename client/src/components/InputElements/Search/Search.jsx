import React, {useState} from 'react'
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  function inputHandler(event){
    setKeyword(event.target.value)
  }
  function searchHandler(event){
    event.preventDefault()
    if(event.code === 'Enter' && keyword){
      navigate(`/post/search?search=${keyword}`)
    }
  }
  return (
    <div className='nav-left__search'>
      <input type='text' placeholder='Search...' onChange={inputHandler} value={keyword} onKeyUp={searchHandler}/>
      <BiSearch className='nav-left--icon' />
    </div>
  );
}

export default Search