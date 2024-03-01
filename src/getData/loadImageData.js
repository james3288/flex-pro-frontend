import instance from "../others/axiosInstance";

const loadImageData = async (path) => {
  try {
    const response = await instance.get(path, { responseType: "blob" });
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(response.data);
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

export default loadImageData;
