import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getTrainerHistory from "../../../getData/getTrainerHistory";
import getExtendedTrainerHistory from "../../../getData/getExtendedTrainerHistory";
import TrainerHistory from "./TrainerHistory";
import ExtendedTrainerHistory from "./ExtendedTrainerHistory";

const MyTrainerHistory = () => {
  const queryKey = useMemo(() => ["forTrainerHistory"], []);
  const queryKey2 = useMemo(() => ["forExtendedTrainerHistory"], []);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("q");

  const {
    isLoading: isPending2,
    error: error2,
    data: data2,
  } = useQuery({
    queryKey,
    queryFn: () => getTrainerHistory(id),
    // refetchInterval: 1000,
  });

  const {
    isLoading: isPending3,
    error: error3,
    data: data3,
  } = useQuery({
    queryKey2,
    queryFn: () => getExtendedTrainerHistory(id),
    // refetchInterval: 1000,
  });

  if (isPending2 || isPending3) {
    return (
      <div id="preloder">
        <div className="loader"></div>
      </div>
    );
  }

  if (error2) {
    return "An error has occurred: " + error2.message;
  } else if (error3) {
    return "An error has occurred: " + error3.message;
  }

  console.log("trainerHistory", data2);
  console.log("trainerExtendedHistory", data3);

  return (
    <>
      <section
        className="team-section team-page"
        style={{ paddingTop: "20px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="team-title">
                <div className="section-title">
                  <span>Flex Pro</span>
                  <h2>TRAINER HISTORY</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {data2.map((userSub) => (
              <TrainerHistory userSub={userSub} />
            ))}
          </div>
          <br />
          <div className="row">
            <div className="col-lg-6">
              <div className="team-title">
                <div className="section-title">
                  <h2>EXTENDED TRAINER HISTORY</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {data3?.length > 0 ? (
              data3.map((extendedSub) => (
                <ExtendedTrainerHistory extendedSub={extendedSub} />
              ))
            ) : (
              <span style={{ color: "orange" }}>No data has been found...</span>
            )}
            {/* {data3.map((extendedSub) => (
              <ExtendedTrainerHistory extendedSub={extendedSub} />
            ))} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyTrainerHistory;
