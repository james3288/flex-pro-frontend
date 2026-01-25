import { useCallback, useMemo } from "react";

// You must define fetchImage somewhere in your codebase
// Example: async function fetchImage(url) { ... }

const useGetLabelFaceDescription = ({ flexProUser, fetchImage, faceapi }) => {
  const convertBlogToImage = useCallback(async ({ flexProUserId }) => {
    // Load the image from the server
    const imgBlob = await fetchImage(flexProUserId);

    if (imgBlob) {
      return await faceapi.bufferToImage(imgBlob);
    } // Convert Blob to Image}

    return undefined;

    // return img;
  }, []);

  const getSpecificUser = useCallback(
    async ({ id, user_subscription_id }) => {
      const userResult = flexProUser?.find(
        (user) =>
          String(user.usersubscription?.flexprouser?.id) === String(id) &&
          String(user.usersubscription.id) === String(user_subscription_id),
      );

      return userResult;
    },
    [flexProUser],
  );

  const getLabeledFaceDescriptions = useCallback(
    async ({ flexProUserId, user_subscription_id }) => {
      const descriptions = [];

      const img = await convertBlogToImage({ flexProUserId: flexProUserId });
      const user = await getSpecificUser({
        id: flexProUserId,
        user_subscription_id: user_subscription_id,
      });

      // Load the face detection model if not already loaded
      await faceapi.nets.tinyFaceDetector.loadFromUri(
        window.location.origin + "/models",
      );

      // Detect faces, landmarks, and compute descriptors
      if (img) {
        const detections = await faceapi
          .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detections) {
          descriptions.push(detections.descriptor);

          return new faceapi.LabeledFaceDescriptors(
            user?.usersubscription?.flexprouser?.name,
            descriptions,
          );
        }
      }

      return undefined;
    },
    [flexProUser],
  );

  return { getLabeledFaceDescriptions };
};

export default useGetLabelFaceDescription;
