import React, { useMemo, useState } from "react";
import getUserHistory from "../../../getData/getUserHistory";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RenewalUsers from "../forRenewal/RenewalUsers";
import ClientsOnWorkout from "../clientsOnWorkout/ClientsOnWorkout";

const MyUserHistory = () => {
  const [userSubscriptionId, setUserSubscriptionId] = useState(0);
  const [extendedSubId, setExtendedSubId] = useState(0);
  const [extendedTrainerId, setExtendedTrainerId] = useState(0);
  const [modalTitle, setModalTitle] = useState();
  const location = useLocation();
  // Access the query parameters from the location object
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("q");

  const queryKey = useMemo(() => ["forUserHistory"], []);

  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: () => getUserHistory(id),
    // refetchInterval: 1000,
  });

  // const { isPending2, error2, data2 } = useQuery({
  //   queryKey2,
  //   queryFn: () => getUserHistory(id),
  //   // refetchInterval: 1000,
  // });

  if (isPending)
    return (
      <div id="preloder">
        <div className="loader"></div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  console.log("userHistoryData", data);

  return (
    <>
      <section
        className="team-section team-page"
        style={{ paddingTop: "20px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="team-title">
                <div className="section-title">
                  <span>Flex Pro</span>
                  <h2>CLIENTS/USERS HISTORY</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="team-title">
                <div className="section-title">
                  <span>USER LOGS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {data?.map((user) => (
              // user.remainingDays <= 2 ||
              <div className="col-4">
                <div className="card" style={{ marginTop: "6px" }}>
                  <div className="card-header">User Logs</div>
                  <div className="card-body">
                    <div className="card-title">Hello</div>
                    <div className="card-text">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Modi doloremque provident quasi recusandae hic et.
                      Sapiente porro asperiores sequi, aut adipisci commodi
                      nostrum veniam, maiores dolore, excepturi at voluptatum
                      ratione.
                    </div>
                  </div>
                  <div className="card-footer">hello</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyUserHistory;
