const formatTimeToString = (timeIn) => {
  const timeInObj = new Date(timeIn);
  const timeInString = timeInObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return timeInString;
};

export default formatTimeToString;
