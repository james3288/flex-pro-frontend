import React, { useEffect } from "react";
import * as faceapi from "face-api.js";
import LoadingEffect from "../mySection/loadingEffect/LoadingEffect";
import instance from "../../others/axiosInstance";
import getImagePath from "../../getData/getImagePath";
import loadImageData from "../../getData/loadImageData";
import remainingDays from "../../others/GetRemainingDays";
import getExtendedSubscription from "../../getData/getExtendedSubscription";
import getSubscriptionDaysLeft from "../../getData/getSubscriptionDaysLeft";
import getExtendedTrainer from "../../getData/getExtendedTrainer";
import { useUserStore } from "../../store/useUserStore";
import getActiveAndInactiveUsers from "../../getData/getActiveAndInactiveUsers";
import useFaceScannerNew from "../../customHooks/useFaceScannerNew";
import useFetchImage from "../../hooks/useFetchImage";
import useCheckIfAlreadyLogin from "../../hooks/useCheckIfAlreadyLogin";
import useFetchUserStatus from "../../hooks/useFetchUserStatus";

const FaceScannerNew = ({
  setPlay,
  setUserId,
  setIsOnGoing,
  setIsLogin,
  setTrainers,
  isLogin,
  setIsExpired,
  setSubscriptionRecord,
}) => {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  const [flexProUser, setFlexProUser] = React.useState([]);
  const [timeInStatus, setTimeInStatus] = React.useState(false);
  const [waiting, setWaiting] = React.useState(false);
  const [savedTimeRecord, setSavedTimeRecord] = React.useState(false);
  const [isLogin2, setIsLogin2] = React.useState(false);
  const numberOfDetection = 3;

  let count = 0;
  let loginstatus = false;

  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const videoHeight = 480;
  const videoWidth = 640;

  const [
    cSetUser,
    cSetTrainerRemainingDays,
    cSetSessionDays,
    cSetExtendedTrainer,
  ] = useUserStore((state) => [
    state.setUser,
    state.setTrainerRemainingDays,
    state.setSessionDays,
    state.setExtendedTrainer,
  ]);

  const [cUser] = useUserStore((state) => [state.user]);

  const loadModels = async () => {
    const MODEL_URL = window.location.origin + "/models";

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(setModelsLoaded(true));
  };

  // function for starting video
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

  // function for closing webcam
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

  // const extendedSub = async (subscriptionId) => {
  //   try {
  //     const data = await getExtendedSubscription(subscriptionId);
  //     return await data;
  //   } catch (error) {
  //     console.error("Error in fetching Extended Subscription:", error);
  //   }
  // };

  // const fetchUserStatus = async (id) => {
  //   try {
  //     const response = await instance.get(`/api/user_status/${id}`);
  //     const users = response.data;

  //     const newUser = await Promise.all(
  //       users.map(async (user) => {
  //         // Call getImagePath asynchronously for each user
  //         const imgpath = await getImagePath(
  //           user.usersubscription.flexprouser?.id === null
  //             ? 0
  //             : user.usersubscription.flexprouser?.id
  //         );

  //         const imageDataUrl = await loadImageData(imgpath.image1);

  //         // get the remaining days
  //         const getRemainingDays = await remainingDays(
  //           user.usersubscription.date_subscribed,
  //           user.usersubscription.subscription.per.per,
  //           0,
  //           user.usersubscription.sub_session_days === 0
  //             ? 1
  //             : user.usersubscription.sub_session_days
  //         );

  //         const getExtendedSubscriptionDays = await extendedSub(
  //           user.usersubscription.id
  //         );

  //         // get extended subscription days left and main subscription days
  //         const extendedSubDays = getSubscriptionDaysLeft(
  //           getRemainingDays,
  //           getExtendedSubscriptionDays,
  //           user.usersubscription.date_subscribed,
  //           false
  //         );

  //         const extendedTrainer = await getExtendedTrainer(
  //           user.usersubscription.id
  //         );

  //         return {
  //           ...user,
  //           image: imageDataUrl || "/media/image/default.jpg",
  //           extendedSubDays: extendedSubDays,
  //           extendedSubscriptions: getExtendedSubscriptionDays,
  //           extendedTrainer: extendedTrainer,
  //         }; // If imgpath is null, use default image
  //       })
  //     );

  //     // console.log("userStatus", newUser);
  //     return newUser;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     return null; // or handle the error appropriately based on your application's needs
  //   }
  // };

  const { fetchUserStatus } = useFetchUserStatus();
  const { checkIfAlreadyIn } = useCheckIfAlreadyLogin();
  const { fetchImage } = useFetchImage();

  async function getLabeledFaceDescriptions() {
    const labeledFaceDescriptors = await Promise.all(
      flexProUser?.map(async (label) => {
        const descriptions = [];
        const flexProUserName = label.usersubscription?.flexprouser?.name;
        const flexProUserId = label.usersubscription?.flexprouser?.id;

        const imgBlob = await fetchImage(flexProUserId);
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

          return new faceapi.LabeledFaceDescriptors(
            flexProUserName,
            descriptions
          );
        }
      })
    );
    setWaiting(true);
    return labeledFaceDescriptors.filter((item) => item != undefined);
  }

  // save time record functions
  const handleSaveTimeRecords = async (timeRecordData, status) => {
    instance
      .post("/api/save_time_record/", timeRecordData)
      .then(function (response) {
        console.log("status:", response.status);

        setTimeInStatus(true);
        // setIsOnGoing(status);

        return true;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
  };

  const _setExtendedTrainer = async (userSubscriptionId) => {
    try {
      const data = await getExtendedTrainer(userSubscriptionId);
      cSetExtendedTrainer(data);
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };

  // LOAD MODELS & USERS
  useEffect(() => {
    const loadFaceModels = async () => {
      await loadModels();
      // await startVideo();
    };

    const loadStartVideo = async () => {
      await startVideo();
    };

    const loadUser = async () => {
      const users = await getActiveAndInactiveUsers(); //getActiveUsers();
      setFlexProUser(users);
      await loadStartVideo();
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

      //  COUNT UPTO numberOfDetection TO FIND OUT THAT THIS USER IS YOU
      loginstatus === false &&
        isLogin === false &&
        results.forEach((result, i) => {
          flexProUser?.forEach(async (label) => {
            if (result.label === label.usersubscription?.flexprouser?.name) {
              count = count + 1;
            }
            // user has been found successfully
            if (
              count >= numberOfDetection &&
              result.label === label.usersubscription?.flexprouser?.name
            ) {
              setUserId(label.usersubscription.flexprouser?.id);
              cSetTrainerRemainingDays(label.trainersRemainingDays);
              cSetSessionDays(label.usersubscription.session_days);
              _setExtendedTrainer(label?.usersubscription?.flexprouser?.id);

              console.log(
                label.usersubscription?.flexprouser?.name +
                  " user has been found"
              );
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

      // check if user have subscription
      if (loginstatus === true) {
        // has user subscription: true

        const get_userStatus = await fetchUserStatus(getUserId); // fetch and initialize user status from db

        // get user status function
        const getUserStatus = async () => {
          let record = null;

          get_userStatus.map((userStatus) => {
            if (
              userStatus.status === "on-going" ||
              userStatus.status === "expired"
            ) {
              // store user record
              record = {
                id: userStatus.usersubscription?.id,
                time_in: new Date(),
                time_out: new Date(1990, 0, 1, 0, 0),
                date_subscribed: userStatus.usersubscription?.date_subscribed,
                per: userStatus.usersubscription?.subscription?.per?.per,
                flexProUserId: userStatus?.usersubscription?.flexprouser?.id,
                session_days: userStatus?.usersubscription?.session_days,
                userSubscriptionId: userStatus?.usersubscription?.id,
                sub_session_days:
                  userStatus?.usersubscription?.sub_session_days,
              };

              setTrainers(() => userStatus); // old set but don't remove
              cSetUser(userStatus); // new set
            }
          });
          return record;
        };

        // get user status if expired or on-going
        const userStatusResult = await getUserStatus();

        // already login function
        const isAlreadyLogin = await checkIfAlreadyIn(getUserId);

        // check if user has already login
        if (isAlreadyLogin?.length > 0) {
          loginstatus = false;

          setIsOnGoing("already-login");
          setSubscriptionRecord(userStatusResult);
          return;
        } // if naka login na diri ra taman

        // proceed here og wala pa ka login
        if (userStatusResult != null && savedTimeRecord === false) {
          loginstatus = false;
          const saved = await handleSaveTimeRecords(
            userStatusResult,
            "on-going"
          );

          setIsOnGoing("on-going");
          setTimeInStatus(true);
          setIsLogin(true);

          setIsExpired(cUser.status);
          setSavedTimeRecord(saved);
          setSubscriptionRecord(userStatusResult);
        } else {
          loginstatus = false;
          const saved = await handleSaveTimeRecords(
            userStatusResult,
            "expired"
          );
          setIsOnGoing("expired");
          setTimeInStatus(false);
          setIsExpired(cUser.status);
          setSavedTimeRecord(saved);
          setSubscriptionRecord(userStatusResult);
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
            <>
              <LoadingEffect />
              <h3 style={{ color: "gray" }}>
                This may take 2 to 4 minutes. Please wait.
              </h3>
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
            flexProUser?.length > 0 ? (
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
