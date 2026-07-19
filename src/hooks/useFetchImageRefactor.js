import { useQuery } from "@tanstack/react-query";
import instance from "../others/axiosInstance";

const fetchImages = async (label) => {
  try {
    const response = await instance.get(`/media/images/${label}/${label}.png`, {
      responseType: "blob",
    });

    const fetchImage = await response.data;
    return fetchImage;
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};

const useFetchImageRefactor = (label) => {
  const queryKey = ["forFetchingImage"];
  const { isPending, error, data, fetchStatus, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const userImages = await fetchImages(label); //getActiveUser();

      return {
        userImages: userImages,
      };
    },
    refetchOnWindowFocus: false,
    // refetchInterval: 1000,
  });

  return { data, isPending, isLoading, error };
};

export default useFetchImageRefactor;
