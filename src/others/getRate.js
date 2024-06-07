const getRate = (per, days) => {
  if (per === "day") {
    if (days >= 1 && days <= 7) {
      return 800;
    } else if (days > 7 && days <= 15) {
      return 1000;
    } else if (days > 15 && days <= 31) {
      return 1500;
    } else if (days > 31) {
      return 1500;
    }
  } else if (per === "month") {
  }
};

export default getRate;
