import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const [state, setState] = useState({
    name: "Argha Golui",
    class: "10B",
  });
  const updateState = () => {
    setTimeout(() => {
      setState({
        name: "Malay Golui",
        class: "11C",
      });
    }, 2000);
  };
  return (
    <NoteContext.Provider value={{state, updateState}}> {/*modern js syntax {state:state,updateState:updateState} */}
        {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
