/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
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
  return (
    <>
      <div className="content">
        <Row>
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Simple Table</h4>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="text-primary">
                      <tr>
                        <th class="text-center">#</th>
                        <th>Name</th>
                        <th class="text-center">Create at</th>
                        <th class="text-right">Role</th>
                        <th class="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center">1</td>
                        <td>Andrew Mike</td>
                        <td class="text-center">2023</td>
                        <td class="text-right">Admin</td>
                        <td class="text-right">
                          <button
                            type="button"
                            id="tooltip264453216"
                            class="btn-icon btn btn-info btn-sm"
                          >
                            <i class="fa fa-user"></i>
                          </button>{" "}
                          <button
                            type="button"
                            id="tooltip366246651"
                            class="btn-icon btn btn-success btn-sm"
                          >
                            <i class="fa fa-edit"></i>
                          </button>{" "}
                          <button
                            type="button"
                            id="tooltip476609793"
                            class="btn-icon btn btn-danger btn-sm"
                          >
                            <i class="fa fa-times"></i>
                          </button>{" "}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-center">2</td>
                        <td>John Doe</td>
                        <td class="text-center">2023</td>
                        <td class="text-right">User</td>
                        <td class="text-right">
                          <button
                            type="button"
                            id="tooltip269174504"
                            class="btn-icon btn btn-info btn-sm"
                          >
                            <i class="fa fa-user"></i>
                          </button>{" "}
                          <button
                            type="button"
                            id="tooltip495755671"
                            class="btn-icon btn btn-success btn-sm"
                          >
                            <i class="fa fa-edit"></i>
                          </button>{" "}
                          <button
                            type="button"
                            id="tooltip94395840"
                            class="btn-icon btn btn-danger btn-sm"
                          >
                            <i class="fa fa-times"></i>
                          </button>{" "}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-center">3</td>
                        <td>Alex Mike</td>
                        <td class="text-center">2023</td>
                        <td class="text-right">User </td>
                        <td class="text-right">
                          <button
                            type="button"
                            id="tooltip667520750"
                            class="btn-icon btn btn-info btn-sm"
                          >
                            <i class="fa fa-user"></i>
                          </button>{" "}
                          <button
                            type="button"
                            id="tooltip793231916"
                            class="btn-icon btn btn-success btn-sm"
                          >
                            <i class="fa fa-edit"></i>
                          </button>{" "}
                          <button
                            type="button"
                            id="tooltip884055770"
                            class="btn-icon btn btn-danger btn-sm"
                          >
                            <i class="fa fa-times"></i>
                          </button>{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <nav class="ml-auto" aria-label="pagination">
            <ul class="pagination">
              <li class="page-item1">
                <a aria-label="Previous" href="#pablo" class="page-link">
                  <span aria-hidden="true">
                    <i aria-hidden="true" class="fa fa-angle-double-left"></i>
                  </span>
                </a>
              </li>
              <li class="page-item">
                <a href="#pablo" class="page-link">
                  1
                </a>
              </li>
              <li class="active page-item">
                <a href="#pablo" class="page-link">
                  2
                </a>
              </li>
              <li class="page-item">
                <a href="#pablo" class="page-link">
                  3
                </a>
              </li>
              <li class="page-item1">
                <a aria-label="Next" href="#pablo" class="page-link">
                  <span aria-hidden="true">
                    <i aria-hidden="true" class="fa fa-angle-double-right"></i>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
          {/* <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-right">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-right">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-right">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-right">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-right">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-right">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-right">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-right">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Table on Plain Background</CardTitle>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-right">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-right">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-right">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-right">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-right">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-right">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-right">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-right">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
      </div>
    </>
  );
}

export default Tables;
