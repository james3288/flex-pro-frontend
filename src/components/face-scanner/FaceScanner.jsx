import React, { useEffect } from "react";
import * as faceapi from "face-api.js";
// import CountFileInsideFolder from "./CountFileInsideFolder";
import axios from "axios";

const FaceScanner = ({
  playNow,
  stopNow,
  setPlay,
  setUserId,
  labels,
  setUserFound,
}) => {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  const [flexProUser, setFlexProUser] = React.useState([]);

  let count = 0;
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const videoHeight = 480;
  const videoWidth = 640;

  React.useEffect(() => {
    // flexProUser
    axios.get(`http://127.0.0.1:8000/api/user_images/`).then((res) => {
      const users = res.data;

      setFlexProUser(users);
    });
  }, []);

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = window.location.origin + "/models";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();

    const startVideo = async () => {
      setCaptureVideo(true);
      navigator.mediaDevices
        .getUserMedia({ video: { width: 300 } })
        .then((stream) => {
          let video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error("error:", err);
        });
    };

    const closeWebcam = async () => {
      console.log("pls wait");
      await videoRef.current.pause();
      await videoRef.current.srcObject.getTracks()[0].stop();
      setCaptureVideo(false);
      setPlay(false);

      console.log("close successfully");
      // let stream = await videoRef.current.stream;
      // const tracks = await stream.getTracks();
      // tracks.forEach((track) => track.stop());
    };

    playNow === true ? startVideo() : console.log("waiting...");
    stopNow === true ? closeWebcam() : console.log("no video found...");
  }, [stopNow]);

  const startVideo = async () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const closeWebcam = async () => {
    await videoRef.current.pause();
    await videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  const fetchImage = async (label) => {
    console.log(label);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/media/images/${label}/${label}.png`,
        { responseType: "blob" }
      );

      return await response.data;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  async function getLabeledFaceDescriptions() {
    const labeledFaceDescriptors = await Promise.all(
      flexProUser.map(async (label) => {
        const descriptions = [];
        console.log(label.flex_pro_user.id);
        const imgBlob = await fetchImage(`${label?.flex_pro_user.id}`);
        const img = await faceapi.bufferToImage(imgBlob); // Convert Blob to Image

        // for (let i = 1; i <= 2; i++) {
        // const img = await faceapi.fetchImage(
        //   // window.location.origin + `/labels/${label}/${i}.png`
        //   // "http://127.0.0.1:8000/static/labels/1/1.png"
        //   fetchImage()
        // );

        // Load the face detection model if not already loaded
        await faceapi.nets.tinyFaceDetector.loadFromUri(
          window.location.origin + "/models"
        );

        // Detect faces, landmarks, and compute descriptors
        const detections = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detections) {
          descriptions.push(detections.descriptor);
          return new faceapi.LabeledFaceDescriptors(
            label.flex_pro_user.name,
            descriptions
          );
        }
        // }
      })
    );

    return labeledFaceDescriptors;
  }

  const handleVideoOnPlay = async () => {
    const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.45);

    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        const results = resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });

        //  COUNT UPTO 60 TO FIND OUT THAT YOU
        results.forEach((result, i) => {
          flexProUser.forEach((label) => {
            if (result.label === label.flex_pro_user.name) {
              count = count + 1;
            }

            if (count >= 60) {
              setUserId(label.flex_pro_user.id);
              setUserFound(label.flex_pro_user.name);
              count = 0;
              closeWebcam();
            }
          });

          const box = resizedDetections[i].detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: result,
          });
          drawBox.draw(canvasRef.current);
        });
      }
    }, 100);
  };

  const handleVideoLoadedMetadata = async () => {
    if (captureVideo) {
      await handleVideoOnPlay();
    }
  };

  return (
    <>
      <div>
        <div style={{ textAlign: "center" }}>
          {captureVideo && modelsLoaded ? (
            <button
              onClick={closeWebcam}
              // style={{
              //   cursor: "pointer",
              //   backgroundColor: "green",
              //   color: "white",
              //   padding: "15px",
              //   fontSize: "25px",
              //   border: "none",
              //   borderRadius: "10px",
              //   position: "absolute",
              // }}
              className="btn btn-danger c-btn"
            >
              Close Webcam
            </button>
          ) : (
            <button
              onClick={startVideo}
              // style={{
              //   cursor: "pointer",
              //   backgroundColor: "green",
              //   color: "white",
              //   padding: "15px",
              //   fontSize: "25px",
              //   border: "none",
              //   borderRadius: "10px",
              // }}
              className="btn btn-success"
            >
              Open Webcam
            </button>
          )}
        </div>

        {captureVideo ? (
          modelsLoaded ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <video
                ref={videoRef}
                // height={videoHeight}
                // width={videoWidth}
                onPlay={handleVideoLoadedMetadata}
                className="camera-stream"
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} className="canvas-box" />
            </div>
          ) : (
            <h1>Loading..</h1>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default FaceScanner;
