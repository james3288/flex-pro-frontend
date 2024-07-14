// Convert milliseconds to readable format
const formatTime = (milliseconds, option) => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

  if (option === "days") {
    return `${days > 0 ? "days" : "day"}`;
  } else if (option === "hours") {
    return `${hours} hours`;
  } else if (option === "seconds") {
    return `${seconds} ${seconds > 1 ? "seconds" : "second"}`;
  } else if (option === "all") {
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  } else if (option === "days-left") {
    return days;
  } else if (option === "hours-left") {
    return hours;
  } else if (option === "minutes-left") {
    return minutes;
  } else if (option === "days-hours") {
    return `${days} ${days > 1 ? "days" : "day"}, ${hours} hours`;
  } else if (option === "days-hours-minutes") {
    return `${days} ${days > 1 ? "days" : "day"}, ${hours} ${
      hours > 1 ? "hours" : "hour"
    }, ${minutes} ${minutes > 1 ? "minutes" : "minute"}`;
  } else if (option === "days-only") {
    return days;
  } else if (option === "days-hours-minutes-seconds") {
    return `${days} ${days > 1 ? "days" : "day"}, ${hours} 
    ${hours > 1 ? "hours" : "hour"}, 
    ${minutes} ${minutes > 1 ? "minutes" : "minute"},
    ${seconds} ${seconds > 1 ? "seconds" : "second"}`;
  }
};

export default formatTime;
