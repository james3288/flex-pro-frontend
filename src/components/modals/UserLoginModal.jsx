import React, { useEffect, useState } from "react";
import NumpadButton from "./NumpadButton";
import getActiveUsers from "../../getData/getActiveUsers";
import remainingDays from "../../others/GetRemainingDays";

const UserLoginModal = () => {
  const [numpadResult, setNumpadResult] = useState("");
  const [activeUser, setActiveUser] = useState(null);
  const [rDays, setRDays] = useState(null);

  const buttonStyle = "btn btn-success";

  const handleNumpadOnClick = (e) => {
    setNumpadResult((prev) => prev + e.target.value);
  };

  const handleDelOnClick = () => {
    setNumpadResult((prev) => prev.slice(0, -1));
  };

  const handleClearOnClick = () => {
    setNumpadResult("");
    setActiveUser(null);
  };

  const get_active_user = async () => {
    return getActiveUsers();
  };

  const handleEnterOnClick = async (id) => {
    const user = await get_active_user();

    const newUser = user.filter((u) => u.usersubscription.flexprouser.id == id);
    setActiveUser(newUser);

    console.log(newUser);
  };

  useEffect(() => {
    console.log("active", activeUser);
  }, [activeUser]);

  // get the remaining days
  const getRemainingDays = async (date_subscribed, per, user_id) => {
    setRDays(await remainingDays(date_subscribed, per, user_id));
  };

  return (
    <div
      className="modal fade bd-example-modal-lg"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content custom-modal-dialog">
          {/* header */}
          <div className="modal-header">
            <h5 className="modal-title">Enter your User ID here:</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/* body */}
          <div className="modal-body">
            <div className="row user-id-row">
              <div className="col-4">
                <h4>
                  USER ID:{" "}
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    className="bi bi-card-image"
                    style={{ color: "green" }}
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
                  </svg>{" "} */}
                  <span style={{ fontSize: "2em" }}>{numpadResult}</span>
                </h4>
              </div>

              <div className="col-8 existing-user">
                {activeUser?.length > 0 ? (
                  <>
                    <h5>Check if it's you?</h5>
                    <div className="existing-user-result">
                      <img
                        src={activeUser[0]?.image}
                        alt=""
                        className="existing-user-result-img"
                      />
                      <div>
                        <h3>
                          {" "}
                          {activeUser[0]?.usersubscription.flexprouser.id}
                          {" - "}
                          {activeUser[0]?.usersubscription.flexprouser.name}
                        </h3>
                        <h5>
                          {
                            activeUser[0]?.usersubscription?.subscription
                              ?.gym_rate_desc
                          }
                        </h5>
                        <div>
                          <button className="btn btn-success">LOGIN</button>{" "}
                          <button
                            className="btn btn-danger"
                            onClick={handleClearOnClick}
                          >
                            CANCEL
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  activeUser != null &&
                  activeUser.length === 0 && (
                    <h4 className="text-danger">No User has been found!</h4>
                  )
                )}
              </div>
            </div>
            <div className="row">
              {/* first row */}
              <NumpadButton
                number="1"
                handleNumpadOnClick={handleNumpadOnClick}
              />
              <NumpadButton
                number="2"
                handleNumpadOnClick={handleNumpadOnClick}
              />
              <NumpadButton
                number="3"
                handleNumpadOnClick={handleNumpadOnClick}
              />

              {/* second row */}
              <NumpadButton
                number="4"
                handleNumpadOnClick={handleNumpadOnClick}
              />
              <NumpadButton
                number="5"
                handleNumpadOnClick={handleNumpadOnClick}
              />
              <NumpadButton
                number="6"
                handleNumpadOnClick={handleNumpadOnClick}
              />

              {/* third row */}
              <NumpadButton
                number="7"
                handleNumpadOnClick={handleNumpadOnClick}
              />
              <NumpadButton
                number="8"
                handleNumpadOnClick={handleNumpadOnClick}
              />
              <NumpadButton
                number="9"
                handleNumpadOnClick={handleNumpadOnClick}
              />
              <NumpadButton
                number="0"
                handleNumpadOnClick={handleNumpadOnClick}
              />

              {/* clear or delete */}
              <div className="col-3 numpad-col">
                <button
                  className="btn btn-secondary numpad"
                  onClick={handleDelOnClick}
                >
                  Del
                </button>
              </div>
              <div className="col-3 numpad-col">
                <button
                  className="btn btn-success numpad"
                  onClick={handleClearOnClick}
                >
                  Clear
                </button>
              </div>
              <div className="col-6 numpad-col">
                <button
                  className="btn btn-warning numpad"
                  onClick={() => handleEnterOnClick(numpadResult)}
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            {/* <button type="button" className="btn btn-primary">
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginModal;
