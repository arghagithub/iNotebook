import React, { useContext } from "react";
import NoteItem from "./NoteItem";
import noteContext from "../context/notes/noteContext";
import Addnote from "./Addnote";
const Notes = () => {
  const context = useContext(noteContext);
  // eslint-disable-next-line
  const { notes ,addnote } = context;
  return (
    <>
      <Addnote/>
      <div className="row my-4">
        <h2>Your notes</h2>
        {notes.map((note, index) => {
          return <NoteItem key={index} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
