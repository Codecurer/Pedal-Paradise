import noteContext from "../notes/noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const Host = "http://localhost:5000";
  const [note, setNote] = useState([]);

  const API_VERIFICATION ={
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("authToken"),
  };

  const getRequest = {
    method: "GET",
    headers: API_VERIFICATION,
  };

  const postRequest = {
    method: "POST",
    headers: API_VERIFICATION,
  };

  const putRequest = {
    method: "PUT",
    headers: API_VERIFICATION,
  };

  const deleteRequest = {
    method: "DELETE",
    headers: API_VERIFICATION,
  };

  const getNotes = async () => {
    const response = await fetch(`${Host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    });
    const data = await response.json();
    setNote(data);
  };

  // add a note
  const addNote = async (title, description, tag) => {
    // TODO API Call
    const response = await fetch(
      `${Host}/api/notes/addnote`,
      Object.assign(postRequest, {
        body: JSON.stringify({
          title: title,
          description: description,
          tag: tag,
        }),
      })
    );
    if (response.status === 200) {
      getNotes();
    }
  };

  // edit note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(
      `${Host}/api/notes/updatenote/${id}`,
      Object.assign(putRequest, {
        body: JSON.stringify({
          title,
          description,
          tag,
        }),
      })
    );
    if (response.status === 200) {
      getNotes();
    }
  };

  //delete a note
  const deleteNote = async (id) => {
    await fetch(`${Host}/api/notes/deletenote/${id}`, deleteRequest);
    let newNote = note.filter((item) => {
      return item._id !== id;
    });
    setNote(newNote);
  };

  return (
    <noteContext.Provider
      value={{
        note,
        addNote,
        editNote,
        deleteNote,
        getNotes,
        postRequest,
        getRequest,
        Host,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
