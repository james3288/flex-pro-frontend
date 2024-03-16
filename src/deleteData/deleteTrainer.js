import React from "react";
import instance from "../others/axiosInstance";

const deleteTrainer = (id) => {
  instance
    .delete(`api/delete_trainer/${id}`)
    .then((response) => {
      console.log(`Deleted post with ID ${id}`);
      // Refresh the page
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error deleting data:", error);
    });
};

export default deleteTrainer;
