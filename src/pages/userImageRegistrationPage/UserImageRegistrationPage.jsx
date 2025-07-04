import { NavLink } from "react-router-dom";
import "./userImageRegistrationPage.scss";
import useUserImageRegistration from "./useUserImageRegistration";
import Cameras from "../../components/cameras/Cameras";
import CaptureIcon from "../../components/svg/captureIcon";
import CameraIcon from "../../components/svg/CameraIcon";

const UserImageRegistrationPage = () => {
  const {
    webcamRef,
    url,
    webcamActive,
    id,
    setId,
    capture,
    setCapture,
    register,
    setRegister,
    count,
    setCount,
    msg,
    setMsg,
    capturePhoto,
    refreshCapture,
    startMyCamera,
    stopMyCamera,
    convertToBase64,
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
                {webcamActive && webcamRef ? (
                  <Cameras webcamRef={webcamRef} />
                ) : (
                  <CameraIcon />
                )}
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
                {/* camera icon here */}
                {<CaptureIcon />}
                {url && <img src={url} alt="Screenshot" className="captured" />}
              </div>
              <div className="camera-btn">
                <button className="btn btn-danger" onClick={refreshCapture}>
                  Refresh
                </button>
                <button
                  className="btn btn-success"
                  // onClick={() => handleSaveUserData()}
                  disabled={register}
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

export default UserImageRegistrationPage;
