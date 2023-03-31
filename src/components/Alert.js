import React from "react";

const Alert = (props) => {
  return (
    <div className="my-2">
      <div className="alert alert-info text-center" role="alert">
        {props.message}
      </div>
    </div>
  );
};

export default Alert;
