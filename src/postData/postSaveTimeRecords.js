import React from "react";
import instance from "../others/axiosInstance";

const PostSaveTimeRecords = async (
  timeRecordData,
  setTimeInStatus,
  setIsOnGoing
) => {
  console.log("timerecord", timeRecordData);
  instance
    .post("/api/save_time_record/", timeRecordData)
    .then(function (response) {
      console.log(response.status);

      setTimeInStatus(true);
      setIsOnGoing("on-going");

      return true;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export default PostSaveTimeRecords;
