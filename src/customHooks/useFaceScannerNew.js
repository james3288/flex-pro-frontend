import React, { useEffect, useRef, useState, useCallback } from "react";
import { useUserStore } from "../store/useUserStore";
import * as faceapi from "face-api.js";
import instance from "../others/axiosInstance";
import getExtendedSubscription from "../getData/getExtendedSubscription";
import getImagePath from "../getData/getImagePath";
import loadImageData from "../getData/loadImageData";
import remainingDays from "../others/GetRemainingDays";
import getSubscriptionDaysLeft from "../getData/getSubscriptionDaysLeft";
import getExtendedTrainer from "../getData/getExtendedTrainer";
import getActiveAndInactiveUsers from "../getData/getActiveAndInactiveUsers";

const useFaceScannerNew = () => {
  // State
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const [flexProUser, setFlexProUser] = useState([]);
  const [timeInStatus, setTimeInStatus] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [savedTimeRecord, setSavedTimeRecord] = useState(false);
  const [isLogin2, setIsLogin2] = useState(false);
  const [subscriptionRecord, setSubscriptionRecord] = useState(null);
  const [isOnGoing, setIsOnGoing] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [trainers, setTrainers] = useState(null);
  const [userId, setUserId] = useState(null);

  // For detection count and login status, use state so they persist
  const [count, setCount] = useState(0);
  const [loginstatus, setLoginstatus] = useState(false);

  const numberOfDetection = 3;

  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const videoHeight = 480;
  const videoWidth = 640;

  // Zustand store setters
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

  // All your utility functions (loadModels, startVideo, closeWebcam, etc.)
  const loadModels = useCallback(async () => {
    const MODEL_URL = window.location.origin + "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
    setModelsLoaded(true);
  }, []);

  const startVideo = useCallback(async () => {
    setCaptureVideo(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 300 },
      });
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();
    } catch (err) {
      setCaptureVideo(false);
      console.error("error:", err);
    }
  }, []);

  const closeWebcam = useCallback(async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.pause();
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setCaptureVideo(false);
    }
  }, []);

  const fetchImage = async (label) => {
    try {
      const response = await instance.get(
        `/media/images/${label}/${label}.png`,
        { responseType: "blob" }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const extendedSub = async (subscriptionId) => {
    try {
      const data = await getExtendedSubscription(subscriptionId);
      return data;
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
          const imgpath = await getImagePath(
            user.usersubscription.flexprouser?.id ?? 0
          );
          const imageDataUrl = await loadImageData(imgpath.image1);
          const getRemainingDays = await remainingDays(
            user.usersubscription.date_subscribed,
            user.usersubscription.subscription.per.per,
            0,
            user.usersubscription.sub_session_days === 0
              ? 1
              : user.usersubscription.sub_session_days
          );
          const getExtendedSubscriptionDays = await extendedSub(
            user.usersubscription.id
          );
          const extendedSubDays = getSubscriptionDaysLeft(
            getRemainingDays,
            getExtendedSubscriptionDays,
            user.usersubscription.date_subscribed,
            false
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
          };
        })
      );
      return newUser;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const checkIfAlreadyIn = async (user_id) => {
    try {
      const response = await instance.get(
        `/api/user_time_record_get/${user_id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  async function getLabeledFaceDescriptions() {
    const labeledFaceDescriptors = await Promise.all(
      flexProUser?.map(async (label) => {
        const descriptions = [];
        const imgBlob = await fetchImage(
          `${label.usersubscription?.flexprouser?.id}`
        );
        const img = await faceapi.bufferToImage(imgBlob);
        await faceapi.nets.tinyFaceDetector.loadFromUri(
          window.location.origin + "/models"
        );
        const detections = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();
        if (detections) {
          descriptions.push(detections.descriptor);
          return new faceapi.LabeledFaceDescriptors(
            label.usersubscription?.flexprouser?.name,
            descriptions
          );
        }
      })
    );
    setWaiting(true);
    return labeledFaceDescriptors.filter((item) => item != undefined);
  }

  const handleSaveTimeRecords = async (timeRecordData, status) => {
    try {
      const response = await instance.post(
        "/api/save_time_record/",
        timeRecordData
      );
      setTimeInStatus(true);
      return true;
    } catch (error) {
      setTimeInStatus(false);
      console.error(error);
      return false;
    }
  };

  const extendedT = async (userSubscriptionId) => {
    try {
      const data = await getExtendedTrainer(userSubscriptionId);
      cSetExtendedTrainer(data);
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };

  // Main face recognition logic (logicHere)
  const logicHere = useCallback(
    async (faceMatcher) => {
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
        //  COUNT UPTO numberOfDetection TO FIND OUT THAT THIS USER IS YOU
        if (!loginstatus && !isLogin) {
          results.forEach((result, i) => {
            flexProUser?.forEach(async (label) => {
              if (result.label === label.usersubscription?.flexprouser?.name) {
                setCount((prev) => prev + 1);
              }
              if (
                count + 1 >= numberOfDetection &&
                result.label === label.usersubscription?.flexprouser?.name
              ) {
                setUserId(label.usersubscription.flexprouser?.id);
                cSetTrainerRemainingDays(label.trainersRemainingDays);
                cSetSessionDays(label.usersubscription.session_days);
                extendedT(label?.usersubscription?.flexprouser?.id);
                setCount(0);
                setLoginstatus(true);
                getUserId = label.usersubscription?.flexprouser?.id;
              }
            });
            const box = resizedDetections[i].detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, {
              label: result,
            });
            drawBox.draw(canvasRef.current);
          });
        }

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
            // console.log("wow", loginstatus);
            loginstatus = false;
            const saved = await handleSaveTimeRecords(
              userStatusResult,
              "on-going"
            );

            setIsOnGoing("on-going");
            setTimeInStatus(true);
            setIsLogin(true);
            // setIsLogin(true);
            // setIsLogin2(true);
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
    },
    [
      flexProUser,
      setUserId,
      cSetTrainerRemainingDays,
      cSetSessionDays,
      extendedT,
      count,
      loginstatus,
      isLogin,
      numberOfDetection,
      videoWidth,
      videoHeight,
    ]
  );

  // LOAD MODELS & USERS on mount
  useEffect(() => {
    const loadFaceModels = async () => {
      await loadModels();
    };
    const loadStartVideo = async () => {
      await startVideo();
    };
    const loadUser = async () => {
      const users = await getActiveAndInactiveUsers();
      setFlexProUser(users);
      await loadStartVideo();
    };
    loadFaceModels();
    loadUser();
  }, [loadModels, startVideo]);

  // Recognition interval
  useEffect(() => {
    if (isLogin2) {
      let intervalId;
      const ff = async () => {
        const labeledFaceDescriptors = await getLabeledFaceDescriptions();
        const faceMatcher = new faceapi.FaceMatcher(
          labeledFaceDescriptors,
          0.4
        );
        intervalId = setInterval(() => {
          logicHere(faceMatcher);
        }, 1000);
      };
      ff();
      return () => clearInterval(intervalId);
    }
  }, [isLogin2, logicHere]);

  // Video event handlers
  const handleVideoOnPlay = async () => {
    setIsLogin2(true);
  };

  const handleVideoLoadedMetadata = async () => {
    if (captureVideo) {
      await handleVideoOnPlay();
    }
  };

  // Return everything possibly needed
  return {
    // State
    modelsLoaded,
    setModelsLoaded,
    captureVideo,
    setCaptureVideo,
    flexProUser,
    setFlexProUser,
    timeInStatus,
    setTimeInStatus,
    waiting,
    setWaiting,
    savedTimeRecord,
    setSavedTimeRecord,
    isLogin2,
    setIsLogin2,
    subscriptionRecord,
    setSubscriptionRecord,
    isOnGoing,
    setIsOnGoing,
    isLogin,
    setIsLogin,
    isExpired,
    setIsExpired,
    trainers,
    setTrainers,
    userId,
    setUserId,
    count,
    setCount,
    loginstatus,
    setLoginstatus,
    numberOfDetection,

    // Refs
    videoRef,
    canvasRef,
    videoHeight,
    videoWidth,

    // Zustand setters
    cSetUser,
    cSetTrainerRemainingDays,
    cSetSessionDays,
    cSetExtendedTrainer,
    cUser,

    // Utility functions
    loadModels,
    startVideo,
    closeWebcam,
    fetchImage,
    extendedSub,
    fetchUserStatus,
    checkIfAlreadyIn,
    getLabeledFaceDescriptions,
    handleSaveTimeRecords,
    extendedT,
    logicHere,
    handleVideoOnPlay,
    handleVideoLoadedMetadata,
  };
};

export default useFaceScannerNew;
