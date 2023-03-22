import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import noteContext from "../context/notes/noteContext";
import jwt from "jwt-decode";

const Login = () => {
  const { postRequest, Host } = useContext(noteContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${Host}/api/auth/login`,
        Object.assign(postRequest, {
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })
      );
      const json = await response.json();

      if (json.status) {
        localStorage.setItem("authToken", json.authToken);
        const user = jwt(json.authToken);
        localStorage.setItem("userInfo",JSON.stringify(user));
        navigate("/");
      } else {
        if (json.error) {
          alert(json.error);
        } else {
          alert(json.errors[0].msg);
          throw new Error("Internal server error");
        }
      }
    } catch (Error) {
      console.log(Error);
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="my-4">
        <h2 className="mb-4">Login and continue to iNotebook</h2>
        <Form>
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
          <Button
            disabled={
              credentials.email.length < 5 || credentials.password.length < 5
            }
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Login &rarr;
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
