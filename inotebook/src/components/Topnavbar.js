import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

export const Topnavbar = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   
  const handleOnLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    navigate("/login");
  }
  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="justify-content-between">
      <Container fluid>
        <LinkContainer to="/">
          <Nav.Link>
            <Navbar.Brand>iNotebook</Navbar.Brand>
          </Nav.Link>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
         
          {localStorage.getItem("authToken")===null ? (
            <Form className="d-flex">
              <LinkContainer to="/login">
                <Nav.Link>
                  <Button className="me-2" variant="outline-primary">
                    Login
                  </Button>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Nav.Link>
                  <Button className="btn btn-primary" variant="primary">
                    Signup
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Form>
          ) : (
            <>
            <span className="text-light me-2">Welcome {userInfo.user.profile.name}</span>
            <Button className="btn btn-primary" onClick={handleOnLogout} variant="success">
              Logout &rarr;
            </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topnavbar;
