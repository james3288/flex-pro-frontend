import instance from "../others/axiosInstance";

const useFetchImage = () => {
  const fetchImage = async (label) => {
    try {
      const response = await instance.get(
        `/media/images/${label}/${label}.png`,
        { responseType: "blob" }
      );

      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return { fetchImage };
};

export default useFetchImage;
