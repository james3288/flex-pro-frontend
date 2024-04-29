import React from "react";
import instance from "../others/axiosInstance";

const CheckIfAlreadyIn = async (user_id) => {
  try {
    const response = await instance.get(`/api/user_time_record_get/${user_id}`);

    return await response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // or handle the error appropriately based on your application's needs
  }
};

export default CheckIfAlreadyIn;
