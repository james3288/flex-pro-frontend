import instance from "../../../../others/axiosInstance";

const useSaveTimeRecords = () => {
  const saveTimeRecords = async (timeRecordData) => {
    instance
      .post("/api/save_time_record/", timeRecordData)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return "this is something wrong in saving time records";
      });
  };
  return { saveTimeRecords };
};

export default useSaveTimeRecords;
