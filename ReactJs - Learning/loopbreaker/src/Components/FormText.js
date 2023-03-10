import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function FormText(props) {
  const [text, setText] = useState("");

  const handleOnClick = () => {
    setText(text.toUpperCase());
    props.showAlert("Converted to uppercase", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleClearText = () => {
    setText("");
  }
  return (
    <>
      <Container>
        <Form>
          <h2
            className="my-4"
            style={{ color: `${props.mode === "light" ? "black" : "white"}` }}
          >
            {props.heading}
          </h2>
          <Form.Group
            className="mb-3 my-4"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Control
              style={{
                fontSize: "20px",
                backgroundColor: `${props.mode === "light" ? "white" : "#14325f"}`,
                color: `${props.mode === "light" ? "black" : "white"}`,
              }}
              as="textarea"
              rows={8}
              value={text}
              onChange={handleOnChange}
            />
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={handleOnClick}>
          Convert Now
        </Button>
        <Button variant="primary" className="mx-3" onClick={handleClearText}>
          Clear Text
        </Button>
      </Container>
      <Container>
        <h2
          className="my-4"
          style={{ color: `${props.mode === "light" ? "black" : "white"}` }}
        >
          Your Text Summary
        </h2>
        <p style={{ color: `${props.mode === "light" ? "black" : "white"}` }}>
          Words is {text.split(" ").filter((element)=>element.length!==0).length} and character is {text.length}
        </p>
        <p style={{ color: `${props.mode === "light" ? "black" : "white"}` }}>
          Your message reading average time - {0.008 * text.split("").length}
        </p>
        <h3 style={{ color: `${props.mode === "light" ? "black" : "white"}` }}>
          Preview
        </h3>
        <p style={{ color: `${props.mode === "light" ? "black" : "white"}` }}>
          {text.length === 0 ? "Nothing to preview..." : text}
        </p>
      </Container>
    </>
  );
}
