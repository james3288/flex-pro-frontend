import { useRef, useState, useCallback } from "react";
import { useActiveCameraStore } from "../../../store/useActiveCamera";

const useVideoCapture = () => {
  const [captureVideo, setCaptureVideo] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cHasVideoOutput, cSetHasVideoOutput] = useActiveCameraStore(
    (state) => [state.hasVideoOutput, state.setHasVideoOutput]
  );

  const startVideo = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasVideoInput = devices.some((d) => d.kind === "videoinput");

      cSetHasVideoOutput(hasVideoInput);

      if (!hasVideoInput) {
        alert("No camera found on this device.");

        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });

      streamRef.current = stream;
      setCaptureVideo(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // videoRef.current.play().catch((err) => {
        //   console.warn("Video play blocked:", err);
        // });
      }
    } catch (err) {
      console.error("getUserMedia error:", err);
      alert(`Camera access failed: ${err.message}`);
    }
  };

  const stopVideo = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCaptureVideo(false);
  }, []);

  return { captureVideo, videoRef, startVideo, stopVideo, setCaptureVideo };
};

export default useVideoCapture;
