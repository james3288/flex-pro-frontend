import { FaceDetection } from "face-api.js";
import React, { useCallback } from "react";
import { useCurrentlyLoginStore } from "../store/currentlyLoginStore";

const useFaceDetectionLogic = ({ canvasRef, faceapi, videoRef }) => {
  const videoHeight = 480;
  const videoWidth = 640;

  let counter = 0;

  const [cSetIsFound, cLoginAttempt, cSetLoginAttempt] = useCurrentlyLoginStore(
    (state) => [state.setIsFound, state.loginnAttempt, state.setLoginAttempt]
  );

  const isFaceDetected = (result, count) => {
    if (!result?.toString()?.includes("unknown") && count <= 5) {
      return true;
    } else {
      return false;
    }
  };

  const faceDetectionLogic = useCallback(
    async (faceMatcher) => {
      if (canvasRef && canvasRef.current && videoRef && videoRef.current) {
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

        // Clear canvas before drawing
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, videoWidth, videoHeight);

        resizedDetections.forEach((detection, i) => {
          if (!faceMatcher) {
            const box = detection.detection.box; // This is a valid IBoundingBox

            const drawBox = new faceapi.draw.DrawBox(box, {
              label: "unrecognized person:login user id first",
            });
            drawBox.draw(canvasRef.current);
            return;
          }

          const result = faceMatcher.findBestMatch(detection.descriptor);
          const box = detection.detection.box; // This is a valid IBoundingBox

          const drawBox = new faceapi.draw.DrawBox(box, {
            label: result.toString(),
          });
          drawBox.draw(canvasRef.current);

          if (isFaceDetected(result, counter)) {
            counter += 1;
            cSetLoginAttempt(counter);
          } else {
            counter = 0;
          }
        });
      }
    },
    [canvasRef, faceapi, videoRef]
  );

  return { faceDetectionLogic };
};

export default useFaceDetectionLogic;
