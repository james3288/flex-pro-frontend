import React, { useEffect } from "react";
import * as faceapi from "face-api.js";

const useFaceApiModel = () => {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);

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
  }, []);

  return { modelsLoaded };
};

export default useFaceApiModel;
