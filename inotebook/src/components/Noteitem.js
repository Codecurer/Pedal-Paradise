import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import noteContext from "../context/notes/noteContext";
import Badge from "react-bootstrap/Badge";

const Noteitem = (props) => {
  const { note, updateNote } = props;
  const { deleteNote } = useContext(noteContext);

  return (
    <>
      <div className="col-md-3 my-2">
        <Card>
          <Card.Body
            style={{
              backgroundImage:
                "url('https://static.vecteezy.com/system/resources/previews/017/396/795/non_2x/google-keep-notes-and-lists-icon-free-png.png')",
            }}
          >
            <div className="d-flex align-items-center">
              <Card.Title>{note.title}</Card.Title>
              <i
                className="fa fa-trash mx-2 text-danger"
                aria-hidden="true"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
              <i
                className="fas fa-edit mx-2 text-success"
                onClick={() => updateNote(note)}
              ></i>
            </div>
            <Card.Text>{note.description}</Card.Text>{" "}
            <Badge bg="success" pill text="light">
              {note.tag}
            </Badge>{" "}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Noteitem;
