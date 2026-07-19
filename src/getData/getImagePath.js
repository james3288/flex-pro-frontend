import instance from "../others/axiosInstance";

const getImagePath = async (id) => {
  try {
    if (id != 0) {
      const response = await instance.get(`/api/get_image_path/${id}`);
      const imagepath = response.data;

      return imagepath;
    }
    return null;
  } catch (error) {
    console.error("Error fetching image path:", error);
    return null;
  }
};

export default getImagePath;
