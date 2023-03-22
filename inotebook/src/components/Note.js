import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./AddNote";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Note = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const notes = useContext(noteContext);
  const getNotes = notes.getNotes;
  const dataNote = notes.note;
  const editNote = notes.editNote;

  useEffect(() => {
      if (localStorage.getItem("authToken")) {
        getNotes();
      } else {
        navigate("/login");
      }
    //eslint-disable
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "Personal",
  });

  const updateNote = (currentNote) => {
    handleShow();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleOnClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    e.preventDefault();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="etitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="etitle"
                placeholder="Enter title"
                value={note.etitle}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="edescription">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="edescription"
                value={note.edescription}
                placeholder="Enter Description"
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="etag">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                name="etag"
                value={note.etag}
                placeholder="Enter Tag"
                onChange={onChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={note.etitle.length < 5 || note.edescription.length < 5}
            onClick={handleOnClick}
            variant="primary"
          >
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
      <Addnote />
      <div className="row my-3">
        <h2>{dataNote.length!=0 ? "Your Keep Notes" : ""}</h2>
        {dataNote.map((item) => {
          return (
            <Noteitem key={item._id} updateNote={updateNote} note={item} />
          );
        })}
      </div>
    </>
  );
};

export default Note;
