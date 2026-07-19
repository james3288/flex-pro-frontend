export const getFormattedDate = (dateParam) => {
  const date = dateParam ? new Date(dateParam) : new Date(); // parse param or use current date
  if (isNaN(date)) return null; // handle invalid date

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};
