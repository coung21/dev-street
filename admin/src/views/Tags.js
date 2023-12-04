import NewTag from '../components/Form/NewTag';
import Paging from '../components/Paging/Paging';
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {  
    Row,
  } from "reactstrap";
function Tags() {
  const [page, setPage] = useState(1)
  const [tags, setTags] = useState([])
  useEffect(() => {
    async function fetchData(){
      const res = await axios.get(
        `http://localhost:3045/v1/api/admin/tag?page=${page}`
      );
      setTags(res.data.data)
    }
    fetchData()
  }, [page])
  function addNewTag(tag){
    setTags(prev => [tag, ...prev])
  }
  return (
    <>
      <div className="content">
        <Row>
          <NewTag addNewTag={addNewTag}/>
        </Row>
        <Row>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Simple Table</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="text-primary">
                      <tr>
                        <th className='text-center'>Name</th>
                        <th className='text-center'>Theme</th>
                        <th className='text-center'>Create at</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tags.map(item => (
                        <tr key={item._id}>
                        <td className='text-center'>{item.name}</td>
                        <td className='text-center' style={{display: 'flex', justifyContent: 'center'}}><div style={{width: '3rem', height: '1rem' ,backgroundColor: item.theme}}></div></td>
                        <td className='text-center'>{new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}</td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Paging page={page} setPage={setPage}/>   
        </Row>
      </div>
    </>
  )
}

export default Tags