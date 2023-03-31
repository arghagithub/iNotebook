import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const noteselement = [
    {
      _id: "6425825908ad9c92cad7a4d6",
      user: "64251b554eb9a35d8bce3419",
      title: "Note 3",
      description: "This is a short note 3",
      tag: "comment",
      date: "2023-03-30T12:36:41.244Z",
      __v: 0,
    },
    {
      _id: "64268793d79e02e17a390af6",
      user: "64251b554eb9a35d8bce3419",
      title: "Note 1",
      description: "This is a short note 1",
      tag: "comment",
      date: "2023-03-31T07:11:15.828Z",
      __v: 0,
    },
    {
      _id: "6426879cd79e02e17a390af8",
      user: "64251b554eb9a35d8bce3419",
      title: "Note 2",
      description: "This is a short note 2",
      tag: "comment",
      date: "2023-03-31T07:11:24.984Z",
      __v: 0,
    },
    {
      _id: "642687a6d79e02e17a390afa",
      user: "64251b554eb9a35d8bce3419",
      title: "Note 4",
      description: "This is a short note 4",
      tag: "comment",
      date: "2023-03-31T07:11:34.363Z",
      __v: 0,
    },
  ];

  const [notes,setNotes]=useState(noteselement);
  return (
    <NoteContext.Provider value={{notes,setNotes}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
