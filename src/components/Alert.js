import React from "react";

const Alert = (props) => {

  const capitalize=(word)=>{
    if(word==='danger'){
      word='error';
    }
    return word.charAt(0).toUpperCase()+word.slice(1);
  }
  return (
    <div className="my-2">
      {props.alert && (
        <div className="container text-center">
          <div
            className={`alert alert-${(props.alert.type)} alert-dismissible fade show my-3`}
            role="alert"
          >
            <strong>{capitalize(props.alert.type)}: </strong>
            {props.alert.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
