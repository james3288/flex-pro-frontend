import instance from "../others/axiosInstance";

const postDayPassTimeRecords = async (formdata) => {
  instance
    .post("/api/daypass_time_record_insert/", formdata)
    .then(function (response) {
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export default postDayPassTimeRecords;
