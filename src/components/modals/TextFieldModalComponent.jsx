import React, { useEffect } from "react";
import { use } from "react";
import { useClearCredentialTextField } from "@store/useClearCredentialTextField";

const TextFieldModalComponent = React.memo(
  ({ type, label, id, name, setText, text, isDisable }) => {
    const [cSetIsClear] = useClearCredentialTextField((state) => [
      state.setIsClear,
    ]);

    const textOnchange = React.useCallback(
      (e) => {
        setText(e.target.value);
        cSetIsClear(false);
      },
      [text, setText]
    );

    return (
      <div className="modal-body">
        <label className="col-form-label">{label}</label>
        <input
          disabled={isDisable}
          type={type}
          className="form-control"
          id={id}
          name={name}
          value={text}
          onChange={textOnchange}
        />
      </div>
    );
  }
);

export default TextFieldModalComponent;
