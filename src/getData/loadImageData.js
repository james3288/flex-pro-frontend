import instance from "../others/axiosInstance";

const cache = new Map();

const loadImageData = async (path) => {
  if (!path) return null;

  // ✅ Return cached image if available
  if (cache.has(path)) {
    return cache.get(path);
  }

  try {
    // Fetch image as blob
    const response = await instance.get(path, { responseType: "blob" });
    const blob = response.data;

    // ✅ Faster + smaller memory footprint using Object URL
    const objectUrl = URL.createObjectURL(blob);

    // Store in cache
    cache.set(path, objectUrl);

    return objectUrl;
  } catch (error) {
    console.error(`Error fetching image at ${path}:`, error.message);
    return null;
  }
};

export default loadImageData;
