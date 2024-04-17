import React from "react";

const FormatDateISO = (date) => {
  // Extract date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if necessary
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if necessary
  const hours = String(date.getHours()).padStart(2, "0"); // Add leading zero if necessary
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Add leading zero if necessary

  // Construct the formatted date string
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDate;
};

export default FormatDateISO;
