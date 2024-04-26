import React from "react";

const NumpadButton = ({ number, handleNumpadOnClick }) => {
  const buttonStyle = "btn btn-info";

  return (
    <div className="col-3 numpad-col">
      <button
        className={buttonStyle + " numpad"}
        value={number}
        onClick={handleNumpadOnClick}
      >
        {number}
      </button>
    </div>
  );
};

export default NumpadButton;
