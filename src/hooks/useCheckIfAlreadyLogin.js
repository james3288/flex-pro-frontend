import instance from "../others/axiosInstance";

const useCheckIfAlreadyLogin = () => {
  // check if already in function
  const checkIfAlreadyIn = async (user_id) => {
    try {
      const response = await instance.get(
        `/api/user_time_record_get/${user_id ?? 0}`
      );

      return await response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // or handle the error appropriately based on your application's needs
    }
  };

  return { checkIfAlreadyIn };
};

export default useCheckIfAlreadyLogin;
