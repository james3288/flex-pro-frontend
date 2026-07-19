import Cameras from "../../cameras/Cameras";
import { NavLink } from "react-router-dom";
import CaptureIcon from "../../svg/captureIcon";
import useUserImageRegistration from "../../../pages/userImageRegistrationPage/useUserImageRegistration";
import "../../../pages/userImageRegistrationPage/UserImageRegistrationPage.scss";
const MyUserImageRegSection = ({ formDone, inputError }) => {
  const {
    webcamRef,
    url,
    webcamActive,
    capture,
    register,
    msg,
    capturePhoto,
    refreshCapture,
    startMyCamera,
    stopMyCamera,
    handleSaveUserData,
    isFormDataValid,
  } = useUserImageRegistration();

  return (
    <>
      <div className="container" id="userRegistrationId">
        <div className="row">
          <div className="col-6">
            {register && (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>{msg}</strong>
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
          </div>
          <div className="col-6">
            {register && (
              <>
                <NavLink
                  className="btn btn-primary"
                  to={`/user-subscription`}
                  style={{ marginRight: "5px" }}
                >
                  Create Subscription
                </NavLink>
                <NavLink
                  className="btn btn-success"
                  to={`/`}
                  style={{ marginRight: "5px" }}
                >
                  Back to Dashboard
                </NavLink>
                <a
                  className="btn btn-danger"
                  href=""
                  style={{ marginRight: "5px" }}
                >
                  Refresh
                </a>
              </>
            )}
          </div>
        </div>
        <div className="row">
          {/* register face */}
          <div className="col-lg-6 col-xs-12">
            <div className="dashboard-col">
              <span>
                <strong>REGISTER</strong> FACE
              </span>
              <div className="camera-wrapper">
                <svg
                  style={{ color: "gray" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="currentColor"
                  className="bi bi-camera-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0" />
                </svg>

                {webcamActive && <Cameras webcamRef={webcamRef} />}
              </div>
              <div className="camera-btn">
                <button className="btn btn-warning" onClick={startMyCamera}>
                  Start Camera
                </button>
                <button className="btn btn-primary" onClick={capturePhoto}>
                  Capture
                </button>
                <button className="btn btn-danger" onClick={stopMyCamera}>
                  Stop
                </button>
              </div>
            </div>
          </div>
          {/* end register face */}

          {/* register face */}
          <div className="col-lg-6 col-xs-12">
            <div className="dashboard-col">
              <span>
                CAPTURE <strong>RESULT</strong>
              </span>
              <div className="camera-wrapper">
                <CaptureIcon />
                {url && <img src={url} alt="Screenshot" className="captured" />}
              </div>
              <div>
                <p>
                  {formDone === false ? (
                    <div className="alert alert-primary" role="alert">
                      Please fill-up form above first...
                    </div>
                  ) : capture === false ? (
                    <div className="alert alert-danger" role="alert">
                      Please capture a picture first...
                    </div>
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <div className="camera-btn">
                <button className="btn btn-danger" onClick={refreshCapture}>
                  Refresh
                </button>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSaveUserData}
                  disabled={!isFormDataValid() || register}
                >
                  Save Now
                </button>
              </div>
            </div>
          </div>
          {/* end register face */}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="user-register"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyUserImageRegSection;
