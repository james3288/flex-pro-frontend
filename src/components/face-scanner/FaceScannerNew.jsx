import React, { useEffect } from "react";
import * as faceapi from "face-api.js";
import LoadingEffect from "../mySection/loadingEffect/LoadingEffect";
import getActiveUsers from "./../../getData/getActiveUsers";
import instance from "../../others/axiosInstance";
import getImagePath from "../../getData/getImagePath";
import loadImageData from "../../getData/loadImageData";
import remainingDays from "../../others/GetRemainingDays";
import getExtendedSubscription from "../../getData/getExtendedSubscription";
import getSubscriptionDaysLeft from "../../getData/getSubscriptionDaysLeft";
import getExtendedTrainer from "../../getData/getExtendedTrainer";
import { useUserStore } from "../../store/useUserStore";

const FaceScannerNew = ({
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
  isLogin,
}) => {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  const [flexProUser, setFlexProUser] = React.useState([]);
  const [timeInStatus, setTimeInStatus] = React.useState(false);
  const [waiting, setWaiting] = React.useState(false);
  const [savedTimeRecord, setSavedTimeRecord] = React.useState(false);
  const [isLogin2, setIsLogin2] = React.useState(false);
  const numberOfDetection = 3;
  const refreshMinutes = 120;

  let count = 0;
  let loginstatus = false;

  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const videoHeight = 480;
  const videoWidth = 640;

  const cSetUser = useUserStore((state) => state.setUser);
  const cUser = useUserStore((state) => state.user);

  const loadModels = async () => {
    const MODEL_URL = window.location.origin + "/models";

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(setModelsLoaded(true));
  };

  // start video here
  const startVideo = async () => {
    setCaptureVideo(true);
    await navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
        console.log("video has been played");
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  // close webcome h ere
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

  const fetchImage = async (label) => {
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

  async function getLabeledFaceDescriptions() {
    const labeledFaceDescriptors = await Promise.all(
      flexProUser?.map(async (label) => {
        const descriptions = [];
        console.log(label.usersubscription?.flexprouser?.id);
        const imgBlob = await fetchImage(
          `${label.usersubscription?.flexprouser?.id}`
        );
        const img = await faceapi.bufferToImage(imgBlob); // Convert Blob to Image

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

          // console.log("agoy", label.flexprouser?.name);
          return new faceapi.LabeledFaceDescriptors(
            label.usersubscription?.flexprouser?.name,
            descriptions
          );
        }
        // }
      })
    );
    setWaiting(true);
    // console.log(labeledFaceDescriptors.filter((item) => item != undefined));
    console.log(labeledFaceDescriptors);
    return labeledFaceDescriptors.filter((item) => item != undefined);
  }

  const handleSaveTimeRecords = async (timeRecordData) => {
    instance
      .post("/api/save_time_record/", timeRecordData)
      .then(function (response) {
        console.log(response.status);

        setTimeInStatus(true);
        setIsOnGoing("on-going");

        return true;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
  };

  useEffect(() => {
    const loadFaceModels = async () => {
      await loadModels();
      // await startVideo();
    };

    const loadStartVideo = async () => {
      await startVideo();
    };

    const loadUser = async () => {
      const users = await getActiveUsers();
      setFlexProUser(users);
      loadStartVideo();
    };

    loadFaceModels();
    loadUser();
  }, []);

  const faceRecognitionLogic = async () => {
    const labeledFaceDescriptors = await getLabeledFaceDescriptions();

    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.4);
    return faceMatcher;
  };

  const logicHere = async (faceMatcher) => {
    let getUserId = 0;

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
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const results = resizedDetections.map((d) => {
        return faceMatcher.findBestMatch(d.descriptor);
      });
      //  COUNT UPTO numberOfDetection TO FIND OUT THAT YOU
      loginstatus === false &&
        isLogin === false &&
        results.forEach((result, i) => {
          flexProUser.forEach(async (label) => {
            if (result.label === label.usersubscription?.flexprouser?.name) {
              count = count + 1;
            }
            // user has been found successfully
            if (
              count >= numberOfDetection &&
              result.label === label.usersubscription?.flexprouser?.name
            ) {
              setUserId(label.usersubscription.flexprouser?.id);
              cSetUser(label.usersubscription.flexprouser);

              console.log("user has been found");
              count = 0;
              loginstatus = true;
              getUserId = label.usersubscription?.flexprouser?.id;
              //return;
            }
          });

          const box = resizedDetections[i].detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: result,
          });
          drawBox.draw(canvasRef.current);
        });

      if (loginstatus === true) {
        // check if user have subscription
        const get_userStatus = await fetchUserStatus(getUserId);
        // // og wala pa ka login
        const getUserStatus = async () => {
          let record = null;
          get_userStatus.map((userStatus) => {
            if (userStatus.status === "on-going") {
              record = {
                id: userStatus.usersubscription?.id,
                time_in: new Date(),
                time_out: new Date(1990, 0, 1, 0, 0),
              };
              setTrainers(() => userStatus);
              cSetUser(userStatus);
            }
          });
          return record;
        };

        // already login function
        const isAlreadyLogin = await checkIfAlreadyIn(getUserId);

        // check if already login
        if (isAlreadyLogin?.length > 0) {
          loginstatus = false;
          setIsOnGoing("already-login");
          
          return;
          //to be continue here sa balay hehehe
        }

        const userStatusResult = await getUserStatus();
        if (userStatusResult != null && savedTimeRecord === false) {
          console.log("wow", loginstatus);
          loginstatus = false;
          const saved = await handleSaveTimeRecords(userStatusResult);
          setIsOnGoing("on-going");
          setTimeInStatus(true);
          setIsLogin(true);
          // setIsLogin(true);
          // setIsLogin2(true);
          setSavedTimeRecord(saved);
        } else {
          setIsOnGoing("expired");
        }
      }
    }
  };

  useEffect(() => {
    if (isLogin2) {
      const ff = async () => {
        const labeledFaceDescriptors = await getLabeledFaceDescriptions();

        const faceMatcher = new faceapi.FaceMatcher(
          labeledFaceDescriptors,
          0.4
        );

        const intervalId = setInterval(() => {
          // Your face detection and recognition logic goes here
          // Update count state if needed
          logicHere(faceMatcher);
        }, 1000);
        return () => clearInterval(intervalId);
      };

      ff();
    }
  }, [isLogin2]);

  const handleVideoOnPlay = async () => {
    setIsLogin2(true);
    // const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    // const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.4);
    // // let loginstatus = false;
    // let getUserId = 0;
    // setInterval(async () => {
    //   console.log("loginstatus", loginstatus);
    //   if (canvasRef && canvasRef.current) {
    //     canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
    //       videoRef.current
    //     );
    //     const displaySize = {
    //       width: videoWidth,
    //       height: videoHeight,
    //     };
    //     faceapi.matchDimensions(canvasRef.current, displaySize);
    //     const detections = await faceapi
    //       .detectAllFaces(
    //         videoRef.current,
    //         new faceapi.TinyFaceDetectorOptions()
    //       )
    //       .withFaceLandmarks()
    //       .withFaceExpressions()
    //       .withFaceDescriptors();
    //     const resizedDetections = faceapi.resizeResults(
    //       detections,
    //       displaySize
    //     );
    //     const results = resizedDetections.map((d) => {
    //       return faceMatcher.findBestMatch(d.descriptor);
    //     });
    //     //  COUNT UPTO numberOfDetection TO FIND OUT THAT YOU
    //     loginstatus === false &&
    //       isLogin === false &&
    //       results.forEach((result, i) => {
    //         flexProUser.forEach(async (label) => {
    //           if (result.label === label.usersubscription?.flexprouser?.name) {
    //             count = count + 1;
    //           }
    //           // user has been found successfully
    //           if (
    //             count >= numberOfDetection &&
    //             result.label === label.usersubscription?.flexprouser?.name
    //           ) {
    //             setUserId(label.usersubscription.flexprouser?.id);
    //             console.log("user has been found");
    //             loginstatus = true;
    //             getUserId = label.usersubscription?.flexprouser?.id;
    //             return;
    //           }
    //         });
    //         const box = resizedDetections[i].detection.box;
    //         const drawBox = new faceapi.draw.DrawBox(box, {
    //           label: result,
    //         });
    //         drawBox.draw(canvasRef.current);
    //       });
    //     // console.log(loginstatus);
    //     if (loginstatus === true) {
    //       // check if user have subscription
    //       const get_userStatus = await fetchUserStatus(getUserId);
    //       // // og wala pa ka login
    //       const getUserStatus = async () => {
    //         let record = null;
    //         get_userStatus.map((userStatus) => {
    //           if (userStatus.status === "on-going") {
    //             record = {
    //               id: userStatus.usersubscription?.id,
    //               time_in: new Date(),
    //               time_out: new Date(1990, 0, 1, 0, 0),
    //             };
    //             setTrainers(() => userStatus);
    //           }
    //         });
    //         return record;
    //       };
    //       const userStatusResult = await getUserStatus();
    //       if (userStatusResult != null && savedTimeRecord === false) {
    //         // const saved = await handleSaveTimeRecords(userStatusResult);
    //         setIsOnGoing("on-going");
    //         setTimeInStatus(true);
    //         isLogin === false && setIsLogin(true);
    //         // setIsLogin(true);
    //         // setIsLogin2(true);
    //         // setSavedTimeRecord(true);
    //       } else {
    //         setIsOnGoing("expired");
    //       }
    //     }
    //   }
    // }, 1000);
    // setInterval(async () => {
    //   myRefresher += 1;
    //   if (myRefresher > refreshMinutes) {
    //     window.location.reload();
    //   }
    // }, 1000);
  };

  const handleVideoLoadedMetadata = async () => {
    if (captureVideo) {
      await handleVideoOnPlay();
    }
  };

  const content = () => {
    return (
      <>
        <div style={{ textAlign: "center" }}>
          {waiting === false && (
            // <h3 style={{ color: "orange" }}>Face initializing...</h3>
            <>
              <LoadingEffect />
              <h3 style={{ color: "gray" }}>Wait for a seconds...</h3>
            </>
          )}
        </div>
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
      </>
    );
  };

  return (
    <>
      <div>
        {captureVideo ? (
          modelsLoaded ? (
            flexProUser.length > 0 ? (
              content()
            ) : (
              <LoadingEffect />
            )
          ) : (
            <LoadingEffect />
          )
        ) : (
          <LoadingEffect />
        )}
      </div>
    </>
  );
};

export default FaceScannerNew;
