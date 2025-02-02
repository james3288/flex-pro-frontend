import React, { useEffect, useState } from "react";
import ClientsOnWorkoutNew from "./clientsOnWorkout/ClientsOnWorkoutNew";
import ClientsOnWorkoutDayPass from "./clientsOnWorkout/ClientsOnWorkoutDayPass";
import useClientsOnWorkout from "../../hooks/useClientsOnWorkout";
import useDebounce from "../../hooks/useDebounce";
import useClientsOnWorkout2 from "../../hooks/useClientsOnWorkout2";
import LoadingEffect from "./loadingEffect/LoadingEffect";

const MyCLientsOnWorkout = () => {
  // const {
  //   date,
  //   data1,
  //   data3,
  //   newData,
  //   newData2,
  //   state,
  //   isPending,
  //   error,
  //   handleChange,
  //   handleSearchOnWorkout,
  //   isLoading,
  // } = useClientsOnWorkout();

  // let value = false;

  // if (isLoading)
  //   return (
  //     <>
  //       <div id="preloder">
  //         <div className="loader"></div>
  //       </div>
  //     </>
  //   );

  const {
    date,
    handleSearchOnWorkout,
    handleDateChange,
    onlineUsers,
    onlineDayPassUsers,
    debounceValue,
  } = useClientsOnWorkout2();

  console.log(onlineUsers);

  return (
    <>
      <div className="container-fluid content-margin c-col-scrollbar">
        <div className="row dateTimePicker">
          <div className="col-lg-2">
            <input
              type="date"
              className="form-control"
              id="floatingTurnoverDate"
              name="turnover_date"
              onChange={handleDateChange}
              defaultValue={date}
            />
          </div>
          <div className="col-lg-4">
            <div className="searchuser">
              <div className="search-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </div>
              <div className="searchinput">
                <input
                  // ref={searchRef}
                  type="text"
                  placeholder="search user here..."
                  onChange={handleSearchOnWorkout}
                  name="name"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h1>
              CLIENTS ON <span>WORKOUT</span>
            </h1>
          </div>
          <div className="form-floating dateTimePicker"></div>
        </div>

        <div className="row">
          <div className="c-col-wrapper">
            <>
              {/* DAYPASS USERS */}
              {onlineDayPassUsers?.length > 0 &&
                onlineDayPassUsers?.map((online) => (
                  <ClientsOnWorkoutDayPass online={online} key={online.id} />
                ))}
              {/* SUBSCRIBED USERS */}
              {onlineUsers?.length > 0 &&
                onlineUsers?.map((online) => (
                  <ClientsOnWorkoutNew online={online} key={online.id} />
                ))}
            </>
          </div>

          {/* <div className="c-col-wrapper">
            {value === false
              ? state.name === ""
                ? data3?.map((online) => (
                    <>
                      <ClientsOnWorkoutDayPass
                        online={online}
                        key={online.id}
                      />
                    </>
                  ))
                : newData2?.map((online) => (
                    <>
                      <ClientsOnWorkoutDayPass
                        online={online}
                        key={online.id}
                      />
                    </>
                  ))
              : ""}

            {value === false ? (
              state.name === "" ? ( // IF search is empty
                data1?.map((online) => (
                  <>
                    <ClientsOnWorkoutNew online={online} key={online.id} />
                  </>
                ))
              ) : (
                newData?.map((online) => (
                  <ClientsOnWorkoutNew online={online} key={online.id} />
                  // <ClientsOnWorkout
                  //   key={online.id}
                  //   id={online.id}
                  //   user_id={online.usersubscription.flexprouser.id}
                  //   name={online.usersubscription.flexprouser.name}
                  //   subscription={
                  //     online.usersubscription.subscription.gym_rate_desc
                  //   }
                  //   timeIn={online.time_in}
                  //   timeOut={online.time_out}
                  //   date_subscribed={online.usersubscription.date_subscribed}
                  //   date_log={online.date_log}
                  //   blobPix={online.image}
                  //   per={online.usersubscription.subscription.per.per}
                  //   setTriggerLogout={setTriggerLogout}
                  //   extendedSubDays={online.extendedSubDays}
                  //   extendedSubscriptions={online.extendedSubscriptions}
                  //   subscription_id={online.usersubscription.subscription.id}
                  // />
                ))
              )
            ) : (
              <h1>hello world 123</h1>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default MyCLientsOnWorkout;
