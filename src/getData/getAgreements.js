import React from "react";
import instance from "../others/axiosInstance";

const getAgreements = async () => {
  try {
    const response = await instance.get(`/api/user_agreement/`);
    const aggreement = response.data;

    console.log(aggreement);
    return aggreement;
  } catch (error) {
    console.error("Error fetching agreements:", error);
  }
};

export default getAgreements;
