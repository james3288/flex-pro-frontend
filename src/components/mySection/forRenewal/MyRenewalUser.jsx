import React, { useMemo } from "react";
import RenewalUsers from "./RenewalUsers";
import getForRenewalUsers from "../../../getData/getForRenewalUsers";
import { useQuery } from "@tanstack/react-query";
import formatTime from "../../../others/ReadableFormatTime";

const MyRenewalUser = () => {
  let value = false;
  const queryKey = useMemo(() => ["forRenewalData"], []);

  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: () => getForRenewalUsers(),
    // refetchInterval: 1000,
  });

  if (isPending)
    return (
      <div id="preloder">
        <div class="loader"></div>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <>
      <div className="container-fluid content-margin c-col-scrollbar">
        <div className="row">
          <div className="form-floating dateTimePicker">
            <h1>
              FOR <span>RENEWAL</span> USERS
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="c-col-wrapper">
            {data.map(
              (user) =>
                user.usersubscription.trainer?.name == null &&
                user.remainingDays > 2 ? (
                  ""
                ) : user.usersubscription.trainer?.name != null && user.remainingDays > 2 && formatTime(user.trainerRemainingDays,"days-only") > 2 ? "" :
                 (
                  <RenewalUsers
                    key={user.id}
                    blobPic={user.image}
                    registeredName={user.usersubscription.flexprouser.name}
                    date_subscribed={user.usersubscription.date_subscribed}
                    subscription={
                      user.usersubscription.subscription.gym_rate_desc
                    }
                    remainingDays={user.remainingDays}
                    per={user.usersubscription.subscription.per.per}
                    user_id={user.usersubscription.flexprouser.id}
                    id={user.id}
                    trainers={user.usersubscription.trainer?.name}
                    trainerRemainingDays={user?.trainerRemainingDays}
                  />
                )
              // user.remainingDays <= 2 ||
              // (formatTime(user.trainerRemainingDays, "days-left") <= 2 ||
              //   user.remainingDays <= 2) && (
              //   <RenewalUsers
              //     key={user.id}
              //     blobPic={user.image}
              //     registeredName={user.usersubscription.flexprouser.name}
              //     date_subscribed={user.usersubscription.date_subscribed}
              //     subscription={
              //       user.usersubscription.subscription.gym_rate_desc
              //     }
              //     remainingDays={user.remainingDays}
              //     per={user.usersubscription.subscription.per.per}
              //     user_id={user.usersubscription.flexprouser.id}
              //     id={user.id}
              //     trainers={user.usersubscription.trainer?.name}
              //     trainerRemainingDays={user?.trainerRemainingDays}
              //   />
              // )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRenewalUser;
