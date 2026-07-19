import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import useFaceApiModel from "./hooks/useFaceApiModel";
import useVideoCapture from "./hooks/useVideoCapture";
import useGetLabelFaceDescription from "./hooks/useGetLabelFaceDescription";
import useFetchImage from "./hooks/useFetchImage";
import useFaceDetectionLogic from "./hooks/useFaceDetectionLogic";
import useGetIdFromCurrentlyLogin from "../../store/useGetIdFromCurrentlyLogin";
import LoadingEffect from "../mySection/loadingEffect/LoadingEffect";

const FaceScannerNew3 = ({
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
  setIsExpired,
  users,
  isLoadingActiveAndInactiveUser,
}) => {
  const [capturedVideoDetected, setCapturedVideoDetected] =
    React.useState(false);
  const [count, setCount] = React.useState(0);
  const canvasRef = React.useRef(null);

  // const [cCurrentlyLogin] = useCurrentlyLoginStore((state) => [
  //   state.currentlyLogin,
  // ]);

  const { flexProUserId, user_subscription_id } = useGetIdFromCurrentlyLogin();

  const intervalRef = useRef(null);
  // const flexProUserId = cCurrentlyLogin?.usersubscription?.flexprouser?.id || 0;

  const { modelsLoaded } = useFaceApiModel();

  // Video capture and face detection
  const { captureVideo, videoRef, startVideo, stopVideo, setCaptureVideo } =
    useVideoCapture();

  // fetch all user images function
  const { fetchImage } = useFetchImage();

  // Face label detection logic function
  const { getLabeledFaceDescriptions } = useGetLabelFaceDescription({
    flexProUser: users?.activeAndInactiveUsers,
    fetchImage: fetchImage,
    faceapi: faceapi,
  });

  // Face detection logic for canvas
  const { faceDetectionLogic } = useFaceDetectionLogic({
    canvasRef: canvasRef,
    faceapi: faceapi,
    videoRef: videoRef,
  });

  const handleVideoLoadedMetadata = async () => {
    if (captureVideo) {
      setCapturedVideoDetected(true);
      //   await handleVideoOnPlay();
    }
  };

  // start video when models are loaded and active users are fetched
  useEffect(() => {
    const startVideoNow = async () => {
      await startVideo();
    };
    if (modelsLoaded) {
      startVideoNow();
    }
  }, [modelsLoaded]);

  useEffect(() => {
    if (capturedVideoDetected) {
      const triggerFaceLabelDescription = async () => {
        const labeledFaceDescriptors = await getLabeledFaceDescriptions({
          flexProUserId: flexProUserId,
          user_subscription_id: user_subscription_id,
        });

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        if (labeledFaceDescriptors) {
          const faceMatcher = new faceapi.FaceMatcher(
            labeledFaceDescriptors,
            0.4,
          );

          intervalRef.current = setInterval(() => {
            if (faceMatcher) {
              faceDetectionLogic(faceMatcher);
            }
          }, 1000);
        } else {
          intervalRef.current = setInterval(() => {
            faceDetectionLogic(undefined);
          }, 1000);
        }
      };

      triggerFaceLabelDescription();
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [capturedVideoDetected, flexProUserId]);

  const content = () => {
    return (
      <>
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
      <div>{content()}</div>
    </>
  );
};

export default FaceScannerNew3;
