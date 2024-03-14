import React from "react";
import instance from "../others/axiosInstance";

const getSuscriptionPackages = async () => {
  try {
    const response = await instance.get(`/api/get_subscription_packages/`);
    const packageDescription = await response.data;

    return packageDescription;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export default getSuscriptionPackages;
