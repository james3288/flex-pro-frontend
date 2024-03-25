import React from "react";
import instance from "../others/axiosInstance";

const deleteExtendedSub = (id) => {
  instance
    .delete(`api/delete_extended_subscription/${id}`)
    .then((response) => {
      console.log(`Deleted post with ID ${id}`);
      // Refresh the page
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error deleting extended subscription:", error);
    });
};

export default deleteExtendedSub;
