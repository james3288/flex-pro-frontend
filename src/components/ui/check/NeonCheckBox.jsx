import React from "react";
import "./neoncheckbox.scss";

const NeonCheckBox = () => {
  return (
    <label className="checkbox-wrapper-new">
      <input type="checkbox" checked />
      <div className="checkmark">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M20 6L9 17L4 12"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>
      <span className="label" style={{ color: "yellowgreen" }}>
        Login Successfully
      </span>
    </label>
  );
};

export default NeonCheckBox;
