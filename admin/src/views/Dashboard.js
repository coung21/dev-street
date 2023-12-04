
import React, {useState, useEffect} from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components

function Dashboard() {
  const [userlabels, setUserLabels] = useState([]);
  const [userDatas, setUserDatas] = useState([]);
  const [postlabels, setPostLabels] = useState([]);
  const [postDatas, setPostDatas] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3045/v1/api/admin/user/today"
        );
        const labels = res.data.data.map((item) => `${item._id.year}-${item._id.month}-${item._id.day}`)
        const data = res.data.data.map((item) => item.count)
        setUserLabels(labels);
        setUserDatas(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3045/v1/api/admin/post/today"
      );
      const labels = res.data.data.map((item) => `${item._id.year}-${item._id.month}-${item._id.day}`)
      const data = res.data.data.map((item) => item.count)
      console.log(data)
      setPostLabels(labels);
      setPostDatas(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);
  return (
    <>
      <div className="content">
        <Col>        
        <Row>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">New Users Each Day</CardTitle>
              </CardHeader>
              <CardBody>
              <Line
                  data={{
                    labels: userlabels,
                    datasets: [
                      {
                        data: userDatas,
                        fill: false,
                        borderColor: "#fbc658",
                        backgroundColor: "transparent",
                        pointBorderColor: "#fbc658",
                        pointRadius: 4,
                        pointHoverRadius: 4,
                        pointBorderWidth: 8,
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      y: {
                          beginAtZero: true,
                          ticks: {
                              stepSize: 1,
                          }
                      }
                  }
                  }}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">New Posts Each Day</CardTitle>
              </CardHeader>
              <CardBody>
              <Line
                  data={{
                    labels: postlabels,
                    datasets: [
                      {
                        data: postDatas,
                        fill: false,
                        borderColor: "#51CACF",
                        backgroundColor: "transparent",
                        pointBorderColor: "#51CACF",
                        pointRadius: 4,
                        pointHoverRadius: 4,
                        pointBorderWidth: 8,
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      y: {
                          beginAtZero: true,
                          ticks: {
                              stepSize: 1,
                          }
                      }
                  }
                  }}
                  width={400}
                  height={100}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        </Col>
      </div>
    </>
  );
}

export default Dashboard;