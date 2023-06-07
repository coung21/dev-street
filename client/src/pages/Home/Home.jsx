import React, {useEffect} from 'react'
import './Home.scss'
import LeftSidebar from '../../components/Sidebar/LeftSidebar/LeftSidebar'


function Home() {
 
  return (
    <div className='home-layout'>
      <LeftSidebar />
    </div>
  )
}

export default Home