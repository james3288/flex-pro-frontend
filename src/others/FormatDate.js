function FormatDate(dateString) {
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

export default FormatDate;
