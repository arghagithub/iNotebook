import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getnote } = context;
  useEffect(() => {
    getnote();
  }, []);
  const ref = useRef(null);
  
  const [note,setnote]=useState({
    etitle:"",edescription:"",etag:""
  })
  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
  };
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const handleclick=(e)=>{
    e.preventDefault();
    console.log("updating the note",note);
  }

  return (
    <>
      <Addnote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{display:'none'}}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onchange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onchange}
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onchange}
                    id="etag"
                    value={note.etag}
                    name="etag"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" onClick={handleclick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <h2>Your notes</h2>
        {notes.map((note, index) => {
          return (
            <NoteItem
              key={index}
              id={note._id}
              updatenote={updatenote}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
