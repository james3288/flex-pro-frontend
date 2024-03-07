import React from "react";
import instance from "../others/axiosInstance";
import loadImageData from "./loadImageData";

const getTrainors = async () => {
  try {
    const response = await instance.get(`/api/get_trainers/`);
    const trainors = await response.data;

    const newTrainors = await Promise.all(
      trainors.map(async (trainor) => {
        // Call getImagePath asynchronously for each user

        const imageDataUrl = await loadImageData(trainor.image);

        return {
          ...trainor,
          image: imageDataUrl || "/media/image/default.jpg",
        }; // If imgpath is null, use default image
      })
    );

    return newTrainors;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export default getTrainors;
