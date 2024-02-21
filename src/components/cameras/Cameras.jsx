import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  facingMode: "user",
};

const Cameras = ({ webcamRef }) => {
  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <>
      <Webcam
        className="camera-stream"
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpg"
        onUserMedia={onUserMedia}
        mirrored={true}
        videoConstraints={videoConstraints}
      />
    </>
  );
};

export default Cameras;
