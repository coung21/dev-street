import React, {useEffect} from 'react'
import axios from 'axios'

function Home() {
  useEffect(() => {
    const fetch = async() => {
      const res = await axios.get(
        'http://localhost:3045/v1/api/google/success'
      );
      return res.data
    }
    console.log(fetch());
  }, [])
  return (
    <div>Home</div>
  )
}

export default Home