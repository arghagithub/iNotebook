import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost/";
  const noteselement = [];

  const [notes, setNotes] = useState(noteselement);

  //fetch all notes

  const getnote = async () => {
    const url = `${host}api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add a note
  const addnote = async (title, description, tag) => {
    //Todo api call
    const url = `${host}api/notes/addnote`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }), //title:title,description:description.....
    });
    // const json = await response.json();
    const note = {
      title: title,
      description: description,
      tag: tag,
    };
    setNotes(notes.concat(note));
  };
  //delete a note
  const deletenote = async (id) => {
    //todo api call
    const url = `${host}api/notes/deletenote/${id}`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };
  //edit a note
  const editnote = async (id, title, description, tag) => {
    //todo api call
    const url = `${host}api/notes/updatenote/${id}`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, getnote, addnote, deletenote, editnote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
