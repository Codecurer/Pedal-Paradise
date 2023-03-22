import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import Form from "react-bootstrap/Form";

const NavBar = (props) => {
  return (
    <Navbar
      bg={`${props.mode === "light" ? "dark" : "light"}`}
      expand="lg"
      variant={`${props.mode === "light" ? "dark" : "light"}`}
      className="fixed-top"
    >
      <Container fluid>
        <LinkContainer to="/">
          <Nav.Link>
            <Navbar.Brand>Press Room</Navbar.Brand>
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
            <LinkContainer to="/entertainment">
              <Nav.Link>Entertainment</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/sports">
              <Nav.Link>Sports</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/business">
              <Nav.Link>Business</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/health">
              <Nav.Link>Health</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/science">
              <Nav.Link>Science</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/technology">
              <Nav.Link>Technology</Nav.Link> 
            </LinkContainer>
            <LinkContainer to="/Customenews">
              <Nav.Link>Customenews</Nav.Link>
            </LinkContainer>
          </Nav>
          <i style={{color:`${props.mode==="light" ? "white" : "red"}`,fontSize:"25px"}} className="fa-solid fa-bookmark fa-lg"></i> &nbsp;&nbsp;&nbsp;
          <Form.Check
            className={`${props.mode === "light" ? "text-light" : "text-dark"}`}
            onClick={props.changeModeToggle}
            type="switch"
            id="custom-switch"
            label={`Switch to ${
              props.mode === "light" ? "light" : "dark"
            } Mode`}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
