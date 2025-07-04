import React, { useEffect, useRef, useState, useCallback } from "react";
import Cameras from "../../cameras/Cameras";
import axios from "axios";
import instance from "../../../others/axiosInstance";
import { NavLink } from "react-router-dom";
import useFormRegistrationStore from "../../../store/useFormRegistrationStore";
import CaptureIcon from "../../svg/captureIcon";
import { calcLength } from "framer-motion";

const MyUserImageRegSection = ({ formDone, inputError }) => {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [webcamActive, setWebcamActive] = useState(true);
  const [capture, setCapture] = useState(false);
  const [register, setRegister] = useState(false);
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("");

  // Get formData from Zustand store
  const { formData } = useFormRegistrationStore();

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapture(true);
    setUrl(imageSrc);
  }, []);

  useEffect(() => {
    if (register) {
      console.log("registered");
    }
  }, [register]);

  const refreshCapture = () => {
    setUrl(null);
    setCapture(false);
  };

  const startMyCamera = () => {
    setWebcamActive(true);
  };

  const stopMyCamera = () => {
    let stream = webcamRef.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setWebcamActive(false);
  };

  const convertToBase64 = async (imageSrc) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
      };
      img.onerror = (error) => reject(error);
      img.src = imageSrc;
    });
  };

  // Save user info using formData from Zustand
  const saveUserInfo = async () => {
    try {
      console.log(formData);
      const response = await instance.post("/api/save_users/", formData);
      return response.data.id;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // Save user image using the returned user id
  const saveUserImage = async (id) => {
    try {
      const base64Image = await convertToBase64(url);
      const datas = { image: base64Image, id: id };
      await instance.post("/api/save_image/", datas);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // Main save handler
  const handleSaveUserData = async () => {
    alert("Button clicked!");
    if (capture === true && url != null) {
      const saveuserinfo = await saveUserInfo();

      if (saveuserinfo > 0) {
        const saveuserimage = await saveUserImage(saveuserinfo);

        if (saveuserimage === true) {
          setCount(0);
          setRegister(true);
          setMsg("User Successfully Registered");
        }
      } else {
        setMsg("There is is something wrong with your registration!");
      }
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const isFormDataValid = () => {
    if (!formData) return false;
    // Check all required fields
    return (
      formData.name &&
      formData.weights &&
      formData.contact_number &&
      formData.contact_number_ioe &&
      Array.isArray(formData.agreements) &&
      formData.agreements.length > 0 &&
      url
    );
  };
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
