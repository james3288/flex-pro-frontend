function FormatDateOnly(dateString) {
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour12: true,
  };

  const newDate = new Date(dateString).toLocaleDateString("en-US", options);

  // Split the input date string by '/'
  const [month, day, year] = newDate.split("/");

  // Convert year to four digits
  const fullYear = parseInt(year, 10) < 50 ? "20" + year : "19" + year;

  // Format and return the date in YYYY-MM-DD format
  return `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export default FormatDateOnly;
