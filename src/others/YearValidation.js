const YearValidation = (myDate) => {
  const mydate = new Date(myDate);
  return mydate.getFullYear();
};

export default YearValidation;
