import React, {useState} from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Button,
  FormGroup,
  Label,
  CustomInput
} from 'reactstrap';

function Login() {
  const [uname, setUname] = useState('')
  const [pass, setPass] = useState('')
  function LogGin(){
    if(uname === process.env.REACT_APP_ADMIN && pass === process.env.REACT_APP_PASSWORD){
      localStorage.setItem('admin', uname)
      window.location.reload()
    }
  }
  return (
    <Container fluid>
      <Row className='d-flex justify-content-center align-items-center h-100'>
        <Col md='12'>
          <Card className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <CardBody className='p-5 w-100 d-flex flex-column'>

              <FormGroup className='mb-4'>
                <Label>
                    Username
                </Label>
                <Input onChange={(e) => setUname(e.target.value)} bsSize="lg" />
              </FormGroup>

              <FormGroup className='mb-4'>
                <Label>
                  Password
                </Label>
                <Input onChange={(e) => setPass(e.target.value)} type="password"  bsSize="lg" />
              </FormGroup>

              <Button onClick={LogGin} color='primary' size='lg' type='button'>
                Login
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
