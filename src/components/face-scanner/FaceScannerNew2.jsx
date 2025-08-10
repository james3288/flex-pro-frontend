import React, { useEffect, useRef } from "react";
import LoadingEffect from "../mySection/loadingEffect/LoadingEffect";
import useVideoCapture from "./hooks/useVideoCapture";
import useGetActiveAndInactiveUsers from "../../hooks/useGetActiveAndInactiveUsers";
import useFaceApiModel from "./hooks/useFaceApiModel";

const FaceScannerNew2 = ({
  setPlay,
  setUserId,
  setIsOnGoing,
  setIsLogin,
  setTrainers,
  isLogin,
  setIsExpired,
  setSubscriptionRecord,
}) => {
  const canvasRef = useRef(null);
  const videoHeight = 480;
  const videoWidth = 640;

  const { isLoading: isLoadingActiveAndInactive } =
    useGetActiveAndInactiveUsers();

  const { modelsLoaded } = useFaceApiModel();
  const { startVideo, captureVideo, setCaptureVideo, videoRef } =
    useVideoCapture();

  useEffect(() => {
    startVideo();
  }, [modelsLoaded]);

  return (
    <div>
      {captureVideo ? (
        <>
          <div style={{ textAlign: "center" }}>
            {isLoadingActiveAndInactive && (
              <>
                <LoadingEffect />
                <h3 style={{ color: "gray" }}>
                  This may take 2 to 4 minutes. Please wait.
                </h3>
              </>
            )}
          </div>

          {/* Camera + Canvas Overlay */}
          <div
            style={{
              position: "relative",
              width: videoWidth,
              height: videoHeight,
              margin: "0 auto",
            }}
          >
            <video
              ref={videoRef}
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              autoPlay
              muted
              playsInline
            />
            <canvas
              ref={canvasRef}
              width={videoWidth}
              height={videoHeight}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                borderRadius: "10px",
                pointerEvents: "none", // don't block clicks
                backgroundColor: "transparent", // keep video visible
              }}
            />
          </div>
        </>
      ) : (
        <LoadingEffect />
      )}
    </div>
  );
};

export default FaceScannerNew2;
