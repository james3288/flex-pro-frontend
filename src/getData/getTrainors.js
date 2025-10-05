import instance from "../others/axiosInstance";
import loadImageData from "./loadImageData";

const getTrainors = async () => {
  try {
    const response = await instance.get(`/api/get_trainers/`);
    const trainors = response.data; // no need for await

    const newTrainors = await Promise.all(
      trainors.map(async (trainor) => {
        if (!trainor.image) {
          return { ...trainor, image: "/media/image/default.jpg" };
        }

        try {
          const imageDataUrl = await loadImageData(trainor.image);
          return {
            ...trainor,
            image: imageDataUrl || "/media/image/default.jpg",
          };
        } catch (e) {
          console.error("Failed to load trainer image:", e);
          return { ...trainor, image: "/media/image/default.jpg" };
        }
      })
    );

    return newTrainors;
  } catch (error) {
    console.error("Error fetching Trainers:", error);
    throw error; // ✅ propagate so React Query can handle retries/fallbacks
  }
};

export default getTrainors;
