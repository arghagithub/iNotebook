import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deletenote } = context;
  const { note,updatenote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash-can fa-xl" onClick={()=>{deletenote(note._id);props.showalert("Deleted succesfully","success")}}></i>
          <i className="fa-solid fa-pen-to-square fa-xl mx-4" onClick={()=>{updatenote(note)}} ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
