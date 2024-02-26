// Convert milliseconds to readable format
const formatTime = (milliseconds, option) => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

  if (option === "days") {
    return `${days} days`;
  } else if (option === "hours") {
    return `${hours} hours`;
  } else if (option === "all") {
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  } else if (option === "days-left") {
    return days;
  } else if (option === "hours-left") {
    return hours;
  }
};

export default formatTime;
