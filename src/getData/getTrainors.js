import React from "react";
import instance from "../others/axiosInstance";

const getTrainors = async () => {
  const response = await instance.get(`/api/get_trainers/`);

  return response.data;
};

export default getTrainors;
