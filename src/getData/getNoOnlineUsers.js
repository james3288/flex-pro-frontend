import React from "react";
import instance from "../others/axiosInstance";

const getNoOnlineUsers = async () => {
  try {
    const response = await instance.get(`/api/no_user_online/`);
    const users = await response.data;
    return users.length;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export default getNoOnlineUsers;
