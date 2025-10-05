import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getExtendedTrainerReport from "../../../getData/getExtendedTrainerReport";
import ExtendedTrainerHistory2 from "./ExtendedTrainerHistory2";
import NoDataFound from "../noDataFound/NoDataFound";
// import NoDataFound from "./NoDataFound";

const MyTrainerHistory = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const trainerId = queryParams.get("q");

  // Memoize date range
  const { formattedDateFrom, formattedDateTo } = useMemo(() => {
    const dateTo = new Date();
    dateTo.setDate(dateTo.getDate() + 1); // add one day
    const dateFrom = new Date(2024, 1, 1);
    return {
      formattedDateFrom: dateFrom.toISOString().split("T")[0],
      formattedDateTo: dateTo.toISOString().split("T")[0],
    };
  }, []);

  // Fetch extended trainer report
  const { isLoading, error, data } = useQuery({
    queryKey: [
      "extendedTrainerReport",
      trainerId,
      formattedDateFrom,
      formattedDateTo,
    ],
    queryFn: () =>
      getExtendedTrainerReport(formattedDateFrom, formattedDateTo, trainerId),
    refetchInterval: 30000, // fetch every 30s, not every 1s
  });

  if (isLoading) {
    return (
      <div id="preloder">
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !data?.length) {
    return <NoDataFound caption="No Data has been found..." />;
  }

  return (
    <section className="team-section team-page" style={{ paddingTop: "20px" }}>
      <div className="container">
        <h2 style={{ color: "orange" }}>{trainerId}</h2>
        <br />
        <div className="row">
          <div className="col-lg-6">
            <div className="team-title">
              <div className="section-title">
                <h2>PERSONAL TRAINING HISTORY</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <ExtendedTrainerHistory2 extendedTraining={data} />
        </div>
      </div>
    </section>
  );
};

export default MyTrainerHistory;
