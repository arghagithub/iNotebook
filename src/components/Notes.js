import React, { useContext }  from "react";
import NoteItem from "./NoteItem";
import noteContext from "../context/notes/noteContext";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div className="row my-4">
      <h2>Your notes</h2>
      {notes.map((note,index) => {
        return <NoteItem key={index} note={note} setNotes={setNotes} />
      })}
    </div>
  );
};

export default Notes;
