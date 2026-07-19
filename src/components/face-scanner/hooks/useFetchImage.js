import React from "react";
import instance from "../../../others/axiosInstance";

// Simple in-memory cache to avoid refetching
const imageCache = new Map();

const useFetchImage = () => {
  const fetchImage = React.useCallback(
    async (label, { asObjectURL = false } = {}) => {
      try {
        // If cached, return directly
        if (imageCache.has(label)) {
          return imageCache.get(label);
        }

        const response = await instance.get(
          `/media/images/${label}/${label}.png`,
          { responseType: "blob" }
        );

        const blob = response.data;

        // If requested as Object URL
        if (asObjectURL) {
          const objectUrl = URL.createObjectURL(blob);
          imageCache.set(label, objectUrl); // cache URL
          return objectUrl;
        }

        imageCache.set(label, blob); // cache Blob
        return blob;
      } catch (error) {
        console.error(`Error fetching image for label "${label}":`, error);
        return undefined;
      }
    },
    []
  );

  return { fetchImage };
};

export default useFetchImage;
