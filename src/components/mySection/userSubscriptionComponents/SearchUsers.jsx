import React, { useState } from "react";
import { ListOfUsers } from "./ListOfUsers";
import { ListOfTrainers } from "./ListOfTrainers";
import SessionDaysField from "../../subScribeNowComponents/SessionDaysField";

const SearchUsers = ({
  searchOutput,
  trainerSearchOutput,
  handleSelectUser,
  handleSelectTrainer,
  setSubscriptionData,
  planNow,
}) => {
  const [searchField, setSearchField] = useState("");
  const [trainerField, setTrainerField] = useState("");
  const [sessionDays, setSessionDays] = useState();

  return (
    <div className="row search-users">
      <div className="col-lg-12">
        {planNow.per.per === "day" && (
          <SessionDaysField
            per={planNow.per.per}
            sessionDays={sessionDays}
            setSessionDays={setSessionDays}
            setSubscriptionData={setSubscriptionData}
          />
        )}

        <input
          type="text"
          placeholder="Search User Here..."
          onChange={(e) => setSearchField(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search Trainor Here..."
          onChange={(e) => setTrainerField(e.target.value)}
        />

        <ListOfUsers
          searchField={searchField}
          handleSelectUser={handleSelectUser}
          isShow={true}
        />
        <ListOfTrainers
          trainers={trainerSearchOutput}
          trainerField={trainerField}
          handleSelectTrainer={handleSelectTrainer}
        />
      </div>
    </div>
  );
};

export default SearchUsers;
