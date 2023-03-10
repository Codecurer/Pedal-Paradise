import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PropTypes from "prop-types";
import { LinkContainer } from "react-router-bootstrap";

export default function TopNavbar(props) {
  return (
    <>
      <Navbar bg={`${props.mode}`} expand="lg" variant={`${props.mode}`}>
        <Container fluid>
          <Navbar.Brand>{props.navbarTitle}</Navbar.Brand>
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
                <Nav.Link>Operations</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form.Check
              className={`text-${props.mode === "light" ? "dark" : "light"}`}
              onClick={props.changeModeToggle}
              type="switch"
              id="custom-switch"
              label={`Switch to ${
                props.mode === "light" ? "dark" : "light"
              } Mode`}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

TopNavbar.propTypes = {
  navbarTitle: PropTypes.string.isRequired,
};

TopNavbar.defaultProps = {
  navbarTitle: "LoopBreakers",
};
