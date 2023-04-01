import React,{useContext,useState} from "react";
import noteContext from "../context/notes/noteContext";
const Addnote = () => {
  const context = useContext(noteContext);
  const { addnote } = context;
  const [note,setnote]=useState({
    title:"",description:"",tag:""
  })
  const addclick=(e)=>{
    e.preventDefault();//to prevent the page reload
    addnote(note.title,note.description,note.tag);
  }
  const onchange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <h2>Add a note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title :
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description :
          </label>
          <input
            type="text"
            className="form-control"
            onChange={onchange}
            id="description"
            name="description"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag :
          </label>
          <input
            type="text"
            className="form-control"
            onChange={onchange}
            id="tag"
            name="tag"
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={addclick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addnote;
