import React, { useEffect, useRef, useState, useCallback } from "react";
import * as faceapi from "face-api.js";
import LoadingEffect from "../mySection/loadingEffect/LoadingEffect";
import getActiveAndInactiveUsers from "../../getData/getActiveAndInactiveUsers";
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
  setUserFound,
  setIsOnGoing,
  isOnGoing,
  setIsLogin,
  setTrainers,
  isLogin,
  setIsExpired,
  setSubscriptionRecord,
}) => {
  // State
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const [recognitionActive, setRecognitionActive] = useState(false);

  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Zustand store setters
  const cSetUser = useUserStore((state) => state.setUser);
  const cSetTrainerRemainingDays = useUserStore(
    (state) => state.setTrainerRemainingDays
  );
  const cSetSessionDays = useUserStore((state) => state.setSessionDays);
  const cSetExtendedTrainer = useUserStore((state) => state.setExtendedTrainer);

  // Constants
  const videoHeight = 480;
  const videoWidth = 640;
  const numberOfDetection = 3;

  // Load face-api.js models
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

  // Start webcam
  const startVideo = useCallback(async () => {
    try {
      setVideoActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 300 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error starting video:", err);
    }
  }, []);

  // Stop webcam
  const stopVideo = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.pause();
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setVideoActive(false);
      setPlay(false);
    }
  }, [setPlay]);

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    try {
      const usersData = await getActiveAndInactiveUsers();
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }, []);

  // Fetch image for face recognition
  const fetchImage = async (label) => {
    try {
      const response = await instance.get(
        `/media/images/${label}/${label}.png`,
        { responseType: "blob" }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  // Prepare labeled face descriptors for recognition
  const getLabeledFaceDescriptors = useCallback(async () => {
    return Promise.all(
      users.map(async (user) => {
        const descriptions = [];
        const label = user.usersubscription?.flexprouser?.id;
        const name = user.usersubscription?.flexprouser?.name;
        if (!label || !name) return undefined;

        const imgBlob = await fetchImage(label);
        if (!imgBlob) return undefined;
        const img = await faceapi.bufferToImage(imgBlob);

        const detections = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detections) {
          descriptions.push(detections.descriptor);
          return new faceapi.LabeledFaceDescriptors(name, descriptions);
        }
        return undefined;
      })
    ).then((arr) => arr.filter(Boolean));
  }, [users]);

  // Main face recognition logic
  const recognizeFace = useCallback(
    async (faceMatcher) => {
      if (!videoRef.current || !canvasRef.current) return;

      const displaySize = { width: videoWidth, height: videoHeight };
      faceapi.matchDimensions(canvasRef.current, displaySize);

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const results = resizedDetections.map((d) =>
        faceMatcher.findBestMatch(d.descriptor)
      );

      let detectionCount = 0;
      let detectedUser = null;

      results.forEach((result, i) => {
        users.forEach((user) => {
          const userName = user.usersubscription?.flexprouser?.name;
          if (result.label === userName) {
            detectionCount += 1;
            detectedUser = user;
          }
        });
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: result.toString(),
        });
        drawBox.draw(canvasRef.current);
      });

      // If detected enough times, set user
      if (detectionCount >= numberOfDetection && detectedUser) {
        setUserId(detectedUser.usersubscription.flexprouser?.id);
        cSetUser(detectedUser.usersubscription?.flexprouser);
        cSetTrainerRemainingDays(detectedUser.trainersRemainingDays);
        cSetSessionDays(detectedUser.usersubscription.session_days);
        cSetExtendedTrainer(
          await getExtendedTrainer(
            detectedUser?.usersubscription?.flexprouser?.id
          )
        );
        setRecognitionActive(false);
        stopVideo();
        // ...additional logic for login, status, etc.
      }
    },
    [
      users,
      setUserId,
      cSetUser,
      cSetTrainerRemainingDays,
      cSetSessionDays,
      cSetExtendedTrainer,
      stopVideo,
    ]
  );

  // Load models and users on mount
  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await loadModels();
      await fetchUsers();
      setLoading(false);
    };
    initialize();
  }, [loadModels, fetchUsers]);

  // Start video and recognition when playNow is true
  useEffect(() => {
    if (playNow && modelsLoaded && users.length > 0) {
      startVideo();
      setRecognitionActive(true);
    }
    if (!playNow) {
      stopVideo();
      setRecognitionActive(false);
    }
    // Cleanup on unmount
    return () => stopVideo();
  }, [playNow, modelsLoaded, users, startVideo, stopVideo]);

  // Recognition loop
  useEffect(() => {
    let intervalId;
    const runRecognition = async () => {
      const labeledFaceDescriptors = await getLabeledFaceDescriptors();
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.4);

      intervalId = setInterval(() => {
        recognizeFace(faceMatcher);
      }, 1000);
    };

    if (recognitionActive) {
      runRecognition();
    }
    return () => clearInterval(intervalId);
  }, [recognitionActive, getLabeledFaceDescriptors, recognizeFace]);

  // Video onPlay handler
  const handleVideoLoadedMetadata = () => {
    setRecognitionActive(true);
  };

  // Render
  if (loading) return <LoadingEffect />;
  if (!modelsLoaded) return <LoadingEffect />;
  if (users.length === 0) return <LoadingEffect />;

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        {!videoActive && <LoadingEffect />}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <video
          ref={videoRef}
          onLoadedMetadata={handleVideoLoadedMetadata}
          className="camera-stream"
          style={{ borderRadius: "10px" }}
        />
        <canvas ref={canvasRef} className="canvas-box" />
      </div>
    </div>
  );
};

export default FaceScannerNew;
