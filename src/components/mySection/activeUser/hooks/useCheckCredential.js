import axios from "axios";
import instance from "@others/axiosInstance";

const checkCredential = async ({ username, password }) => {
  try {
    const userDetails = {
      username: username,
      password: password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = instance.post(
      "/api/check-credentials/",
      userDetails,
      config
    );
    const credential = await response;

    if (credential?.data.valid) {
      console.log("✅ Credentials are correct:", credential?.data?.username);
      return credential?.data;
    } else {
      console.log("❌ Invalid username or password");
      return false;
    }
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

const useCheckCredential = () => {
  return { checkCredential };
};

export default useCheckCredential;
