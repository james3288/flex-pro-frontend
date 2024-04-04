import React from "react";
import PdfGenerator from "../../PDF/PdfGenerator";

const UserContractModal = ({ id, user }) => {
  console.log(id, user);
  return (
    <div
      className="modal fade"
      id={id}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              USER CONTRACT AGREEMENT
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{<PdfGenerator user={user} />}</div>
        </div>
      </div>
    </div>
  );
};

export default UserContractModal;
