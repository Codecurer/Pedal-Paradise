import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import noteContext from "../context/notes/noteContext";
import jwt from "jwt-decode";

const Signup = () => {
  const { postRequest, Host } = useContext(noteContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const { name, email, password, cpassword } = credentials;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      alert("Confirm Password not matched!");
    } else {
      const response = await fetch(
        `${Host}/api/auth/createUser`,
        Object.assign(postRequest, {
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        })
      );
      const json = await response.json();
      localStorage.setItem("authToken", json.authToken);
      const user = jwt(json.authToken);
      localStorage.setItem("userInfo",JSON.stringify(user));
      navigate("/");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="my-4">
      <h2 className="mb-4">Create and account to use iNotebook</h2>

      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={credentials.name}
            onChange={onChange}
            placeholder="Enter Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cpassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="cpassword"
            onChange={onChange}
            value={credentials.cpassword}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleSubmit}>
          Signup &rarr;
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
