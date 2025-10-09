import React, { useEffect, useMemo } from "react";
import ClientsOnWorkoutNew from "./clientsOnWorkout/ClientsOnWorkoutNew";
import ClientsOnWorkoutDayPass from "./clientsOnWorkout/ClientsOnWorkoutDayPass";
import useClientsOnWorkout2 from "../../hooks/useClientsOnWorkout2";

const SearchIcon = React.memo(() => (
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
));

const MyCLientsOnWorkout = () => {
  const {
    date,
    handleSearchOnWorkout,
    handleDateChange,
    onlineUsers = [],
    onlineDayPassUsers = [],
    setRefreshKey,
  } = useClientsOnWorkout2();

  // ✅ Memoize rendered users to prevent unnecessary recalculation
  const dayPassList = useMemo(
    () =>
      onlineDayPassUsers.map((user) => (
        <ClientsOnWorkoutDayPass
          key={user.id}
          online={user}
          setRefreshKey={setRefreshKey}
        />
      )),
    [onlineDayPassUsers, setRefreshKey]
  );

  // const userList = useMemo(
  //   () =>
  //     onlineUsers.map((user) => (
  //       <ClientsOnWorkoutNew key={user.id} online={user} />
  //     )),
  //   [onlineUsers]
  // );

  const userList = useMemo(
    () =>
      onlineUsers.map((user) => (
        <ClientsOnWorkoutNew key={user.id} online={user} />
      )),
    [onlineUsers]
  );

  return (
    <div className="container-fluid content-margin c-col-scrollbar">
      {/* Date & Search */}
      <div className="row dateTimePicker">
        <div className="col-lg-2">
          <input
            type="date"
            className="form-control"
            name="turnover_date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div className="col-lg-4">
          <div className="searchuser">
            <div className="search-icon">
              <SearchIcon />
            </div>
            <div className="searchinput">
              <input
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
      </div>

      {/* Users */}
      <div className="row">
        <div className="c-col-wrapper">
          {dayPassList}
          {userList}
        </div>
      </div>
    </div>
  );
};

export default MyCLientsOnWorkout;
