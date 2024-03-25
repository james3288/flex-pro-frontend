import React from "react";
import instance from "../others/axiosInstance";

const deleteExtendedTrainer = (id) => {
  instance
    .delete(`api/delete_extended_trainer/${id}`)
    .then((response) => {
      console.log(`Deleted post with ID ${id}`);
      // Refresh the page
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error deleting extended trainer:", error);
    });
};

export default deleteExtendedTrainer;
