import React, { useCallback } from "react";
import instance from "../../../others/axiosInstance";

const useFetchImage = () => {
  const fetchImage = useCallback(async (label) => {
    try {
      const response = await instance.get(
        `/media/images/${label}/${label}.png`,
        { responseType: "blob" }
      );

      return await response.data;
    } catch (error) {
      console.error("Error fetching image:", error);
      return undefined;
    }
  }, []);
  return { fetchImage };
};

export default useFetchImage;
