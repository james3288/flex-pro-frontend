import React, { useEffect } from "react";
import Cameras from "../../cameras/Cameras";
import { useState, useRef } from "react";
import axios from "axios";

const MyUserImageRegSection = ({
  formData,
  setFormData,
  formDone,
  inputError,
}) => {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [webcamActive, setWebcamActive] = useState(true);
  const [id, setId] = useState(0);
  const [capture, setCapture] = useState(false);
  const [register, setRegister] = useState(false);
  const [count, setCount] = useState(0);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapture(true);
    setUrl(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    console.log("registered");
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

  // React.useEffect(() => {}, [formDone]);

  const convertToBase64 = (imageSrc) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
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

  const handleSave = async () => {
    let id1 = 0;
    if (formDone === true && capture === true) {
      axios
        .post("http://127.0.0.1:8000/api/save_users/", formData)
        .then(function (response) {
          id1 = response.data.id;
          console.log(id1);
        })
        .catch(function (error) {
          console.log(error);
          return;
        });

      setTimeout(async () => {
        // Convert the image data to Base64
        const base64Image = await convertToBase64(url);
        const datas = { image: base64Image, id: id1 };

        axios
          .post("http://127.0.0.1:8000/api/save_image/", datas)
          .then(function (response) {
            console.log(response);
            setCount(0);

            setRegister(true);
          })
          .catch(function (error) {
            console.log(error);
            return;
          });
      }, 1000);
    } else {
      setCount((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="container" id="userRegistrationId">
        <div className="row">
          <div className="col-12">
            {register && (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                <strong>User Successfuly Registered!</strong>
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
                <svg
                  style={{ color: "gray" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="currentColor"
                  className="bi bi-file-earmark-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0m2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755" />
                </svg>

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
                  className="btn btn-success"
                  onClick={() => handleSave()}
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

export default MyUserImageRegSection;
