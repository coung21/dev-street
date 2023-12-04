
import Paging from "../components/Paging/Paging";
import React, {useState, useEffect} from "react";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables() {
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState([])
  useEffect(() => {
    async function fetchData(){
      const res = await axios.get(
        `http://localhost:3045/v1/api/admin/user?page=${page}`
      );
      setUsers(res.data.data)
    }
    fetchData()
  }, [page])
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Join Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(item => (
                       <tr key={item._id}>
                       <td>{item._id}</td>
                       <td>{item.username}</td>
                       <td>{item.email}</td>
                       <td>{new Date(item.joinDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}</td>
                     </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Paging page={page} setPage={setPage}/>
        </Row>
      </div>
    </>
  );
}

export default Tables;
