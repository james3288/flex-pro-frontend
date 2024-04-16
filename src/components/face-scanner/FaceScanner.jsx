import React, { useEffect } from "react";
import * as faceapi from "face-api.js";
// import CountFileInsideFolder from "./CountFileInsideFolder";
import axios from "axios";
import instance from "../../others/axiosInstance";
import getImagePath from "../../getData/getImagePath";
import loadImageData from "../../getData/loadImageData";
import remainingDays from "../../others/GetRemainingDays";
import getExtendedSubscription from "../../getData/getExtendedSubscription";
import getSubscriptionDaysLeft from "../../getData/getSubscriptionDaysLeft";
import getExtendedTrainer from "../../getData/getExtendedTrainer";

const FaceScanner = ({
  playNow,
  stopNow,
  setPlay,
  setUserId,
  labels,
  setUserFound,
  setIsOnGoing,
  isOnGoing,
  setIsLogin,
  setTrainers,
}) => {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  const [flexProUser, setFlexProUser] = React.useState([]);
  const [timeInStatus, setTimeInStatus] = React.useState(false);

  const numberOfDetection = 20;

  let count = 0;
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const videoHeight = 480;
  const videoWidth = 640;

  React.useEffect(() => {
    // flexProUser
    instance.get(`/api/user_images/`).then((res) => {
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
      const response = await instance.get(
        `/media/images/${label}/${label}.png`,
        { responseType: "blob" }
      );

      return await response.data;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const extendedSub = async (subscriptionId) => {
    try {
      const data = await getExtendedSubscription(subscriptionId);
      return await data;
    } catch (error) {
      console.error("Error in fetching Extended Subscription:", error);
    }
  };

  const fetchUserStatus = async (id) => {
    try {
      const response = await instance.get(`/api/user_status/${id}`);
      const users = response.data;

      const newUser = await Promise.all(
        users.map(async (user) => {
          // Call getImagePath asynchronously for each user
          const imgpath = await getImagePath(
            user.usersubscription.flexprouser.id
          );

          const imageDataUrl = await loadImageData(imgpath.image1);

          // get the remaining days
          const getRemainingDays = await remainingDays(
            user.usersubscription.date_subscribed,
            user.usersubscription.subscription.per.per
          );

          const getExtendedSubscriptionDays = await extendedSub(
            user.usersubscription.id
          );

          // get extended subscription days left and main subscription days
          const extendedSubDays = getSubscriptionDaysLeft(
            getRemainingDays,
            getExtendedSubscriptionDays,
            user.usersubscription.date_subscribed,
            true
          );

          const extendedTrainer = await getExtendedTrainer(
            user.usersubscription.id
          );

          return {
            ...user,
            image: imageDataUrl || "/media/image/default.jpg",
            extendedSubDays: extendedSubDays,
            extendedSubscriptions: getExtendedSubscriptionDays,
            extendedTrainer: extendedTrainer,
          }; // If imgpath is null, use default image
        })
      );

      console.log("userStatus", newUser);
      return newUser;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // or handle the error appropriately based on your application's needs
    }
  };

  const checkIfAlreadyIn = async (user_id) => {
    try {
      const response = await instance.get(
        `/api/user_time_record_get/${user_id}`
      );

      return await response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // or handle the error appropriately based on your application's needs
    }
  };

  const handleSaveTimeRecords = async (timeRecordData) => {
    instance
      .post("/api/save_time_record/", timeRecordData)
      .then(function (response) {
        console.log("successfully saved..");
      })
      .catch(function (error) {
        console.log(error);
        return;
      });
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
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.4);

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

        //  COUNT UPTO numberOfDetection TO FIND OUT THAT YOU
        results.forEach((result, i) => {
          flexProUser.forEach(async (label) => {
            if (result.label === label.flex_pro_user.name) {
              count = count + 1;
            }

            // user has been found successfully
            if (
              count >= numberOfDetection &&
              result.label === label.flex_pro_user.name
            ) {
              setUserId(label.flex_pro_user.id);
              setUserFound(label.flex_pro_user.name);
              await closeWebcam();
              count = 0;

              // check if user have subscription
              const get_userStatus = await fetchUserStatus(
                label.flex_pro_user.id
              );

              // check if user have already login
              const isAlreadyLogin = await checkIfAlreadyIn(
                label.flex_pro_user.id
              );

              if (isAlreadyLogin?.length > 0) {
                setIsLogin = true;
                setIsOnGoing("already-login");
                return;
                //to be continue here sa balay hehehe
              }

              // og wala pa ka login
              let timeRecordData = {};
              get_userStatus.map((userStatus) => {
                const user_id = userStatus.usersubscription.flexprouser;

                if (
                  userStatus.status === "on-going" &&
                  timeInStatus === false
                ) {
                  // insert to time record table
                  timeRecordData = {
                    id: userStatus.usersubscription.id,
                    time_in: new Date(),
                    time_out: new Date(1990, 0, 1, 0, 0),
                  };
                  setTimeInStatus(true);
                  console.log(timeRecordData);
                  setIsOnGoing("on-going");
                  // console.log("userStatus", userStatus);

                  setTrainers(() => userStatus);

                  return;
                }
              });

              // if expired
              get_userStatus.length === 0 && timeInStatus === false
                ? setIsOnGoing("expired")
                : await handleSaveTimeRecords(timeRecordData);
              // setIsOnGoing("expired");
              return;
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
            <button onClick={closeWebcam} className="btn btn-danger c-btn">
              Close Webcam
            </button>
          ) : (
            <button onClick={startVideo} className="btn btn-success">
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
