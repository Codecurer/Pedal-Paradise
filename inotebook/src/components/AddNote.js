import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alerts from "../components/Alerts";
import noteContext from "../context/notes/noteContext";

const Addnote = () => {
  const notes = useContext(noteContext);
  const { addNote } = notes;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "Personal",
  });

  const handleOnClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        {/* <Alerts /> */}
        <div className="container my-3">
          <h2>Add New Note</h2>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title"
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter Description"
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="tag">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                name="tag"
                placeholder="Enter Tag"
                onChange={onChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleOnClick} disabled={note.title.length < 5 || note.description.length < 5}>
              Add Note
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Addnote;
