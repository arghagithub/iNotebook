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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyNTFiNTU0ZWI5YTM1ZDhiY2UzNDE5In0sImlhdCI6MTY4MDE2MjUzM30.iUt7AkN8Xc7l7rqOolOArKvryCSbFA3BLQHisjeg_kU",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add a note
  const addnote = async (title, description, tag) => {
    //Todo api call
    const url = `${host}api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyNTFiNTU0ZWI5YTM1ZDhiY2UzNDE5In0sImlhdCI6MTY4MDE2MjUzM30.iUt7AkN8Xc7l7rqOolOArKvryCSbFA3BLQHisjeg_kU",
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
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyNTFiNTU0ZWI5YTM1ZDhiY2UzNDE5In0sImlhdCI6MTY4MDE2MjUzM30.iUt7AkN8Xc7l7rqOolOArKvryCSbFA3BLQHisjeg_kU",
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
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyNTFiNTU0ZWI5YTM1ZDhiY2UzNDE5In0sImlhdCI6MTY4MDE2MjUzM30.iUt7AkN8Xc7l7rqOolOArKvryCSbFA3BLQHisjeg_kU",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json = await response.json();s
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
